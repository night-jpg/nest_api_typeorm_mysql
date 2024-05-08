import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) { }

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.idusers,
                name: user.name,
                email: user.email
            }, {
                expiresIn: '7 days',
                subject: String(user.idusers),
                issuer: 'login',
                audience: 'users'
            })
        };
    }

    async checkToken(token: string) {
        //return this.jwtService.verify();
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        })

        if (!user) {
            throw new UnauthorizedException("Email ou senha incorretos");
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
