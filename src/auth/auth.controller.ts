import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, UploadedFiles, ParseFilePipe, BadRequestException, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth.login.dto';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { AuthResetDto } from './dto/auth.reset.dto';
import { AuthService } from './auth.service';
import { AuthForgetDto } from './dto/auth.forget.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as PrismaUser } from '@prisma/client';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly AuthService: AuthService,
        private readonly FileService: FileService
    ) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.AuthService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.AuthService.register(body);
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDto) {
        return this.AuthService.forget(email);
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDto) {
        return this.AuthService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user: PrismaUser) {
        return { user };
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user: PrismaUser, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image/jpeg' }),
            new MaxFileSizeValidator({maxSize: 1024 * 100})
        ]
    })) photo: Express.Multer.File) {
        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.idusers}.png`);
        try {
            await this.FileService.upload(photo, path);
        } catch (e) {
            throw new BadRequestException(e)
        }
        return { success: true };
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user: PrismaUser, @UploadedFiles() files: Express.Multer.File[]) {

    }

    @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }, { name: 'documents', maxCount: 10 }]))
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user: PrismaUser, @UploadedFiles() files: { photo: Express.Multer.File, documents: Express.Multer.File[] }) {
        return { files }
    }
}
