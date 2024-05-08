import {Controller, Post} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth.login.dto';
import {Body} from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { AuthResetDto } from './dto/auth.reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthForgetDto } from './dto/auth.forget.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
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
}