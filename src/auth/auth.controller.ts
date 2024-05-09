import {Controller, Post,Body, Req, UseGuards} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { AuthResetDto } from './dto/auth.reset.dto';
import { AuthService } from './auth.service';
import { AuthForgetDto } from './dto/auth.forget.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as PrismaUser }  from '@prisma/client';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly AuthService: AuthService
    ){}

    @Post('login')
    async login(@Body() {email,password}: AuthLoginDTO) {
        return this.AuthService.login(email,password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.AuthService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email} : AuthForgetDto) {
        return this.AuthService.forget(email);
    }
    
    @Post('reset')
    async reset(@Body() {password, token}:AuthResetDto) {
        return this.AuthService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
        async me(@User() user : PrismaUser){
            return {user};
        }
}