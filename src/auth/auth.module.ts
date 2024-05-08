import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
    JwtModule.register({secret: `9YDrDskr$9f;NPU_HP'C^TV6~[^QQ!i4`}),
    UserModule,
    PrismaModule
],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [],
})

export class AuthModule{

}