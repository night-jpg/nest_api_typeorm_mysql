import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    private issuer : string = 'login';
    private audience : string = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) { }

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.idusers,
                name: user.name,
                email: user.email
            }, {
                expiresIn: '7 days',
                subject: String(user.idusers),
                issuer: this.issuer,
                audience: this.audience
            })
        };
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer,
            });
            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
        } catch (e) {
            return false;
        }

    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,              
            }
        })

        if (!user) {
            throw new BadRequestException("Email não cadastrado");
        }

        if ((!await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException("Senha Incorreta");
        }

        return this.createToken(user);
    }
    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        })

        if (!user) {
            throw new UnauthorizedException("O email não está cadastrado");
        }

        return this.createToken(user);
    }
    async reset(password: string, token: string) {
        //To do: Validar o token
        const idusers = 0;
        const reset = await this.prisma.user.update({
            where: {
                idusers
            },
            data: {
                password
            }
        })
        return true;
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }
}
