import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDto {
  @IsStrongPassword()
  password: string;

  @IsJWT()
  token: string;
}
