import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { CreateUserDTO } from "src/user/dto/create.user.dto";

export class AuthRegisterDTO extends CreateUserDTO{
    
}