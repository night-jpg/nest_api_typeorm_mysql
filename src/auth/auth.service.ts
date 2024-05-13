import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    private issuer: string = 'login';
    private audience: string = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly mailer: MailerService,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) { }

    createToken(user: UserEntity) {

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
            return true
        } catch (e) {
            return false;
        }

    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({
                email,
        })

        if (!user) {
            throw new BadRequestException("Email não cadastrado");
        }

        if ((!await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Senha Incorreta");
        }

        return this.createToken(user);
    }
    async forget(email: string) {
        const user = await this.usersRepository.findOneBy({
                email,
        })

        if (!user) {
            throw new UnauthorizedException("O email não está cadastrado");
        }

        const token = this.jwtService.sign(
            { id: user.idusers }, {
            expiresIn: '30 minutes',
            subject: String(user.idusers),
            issuer: 'forget',
            audience: 'users'
        }
        )
        
        await this.mailer.sendMail({
            subject: "Recuperação de Senha",
            to: "ppma.txt@gmail.com",
            template: 'forget',
            context: {
                name: user.name,
                token
            }
        });

        return {success : true};
    }
    async reset(password: string, token: string) {
    
        try{
            const data:any = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'users'
            })

            if(isNaN(Number(data.id))){
                throw new BadRequestException("Token é inválido");
            }

            password = await bcrypt.hash(password, await bcrypt.genSalt())

            await this.usersRepository.update(Number(data.id),{
                password
            })

            const user = await this.userService.show(Number(data.id));

            return this.createToken(user);

        }catch(e){
            throw new BadRequestException(e)
        }
    }

    async register(data: AuthRegisterDTO) {
        delete data.role
        const user = await this.userService.create(data);
        return this.createToken(user);
    }
}
