import { Transform } from "class-transformer";
import { IsString, IsEmail, IsStrongPassword, IsDate, IsOptional, IsDateString, IsEnum } from "class-validator";
import { Role } from "../../enums/role.enum";

export class CreateUserDTO{
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string;
    @IsOptional()
    @IsDateString()
    birthDay?: string;
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsEnum(Role)
    role?: number;
}