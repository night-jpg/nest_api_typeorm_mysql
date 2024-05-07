import {Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUser } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";

//@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @UseInterceptors(LogInterceptor)
    @Post()
    async create(@Body() data : CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(':id')
    async show(@ParamId() idusers : number){
        return this.userService.show(idusers);
    }

    @Put(':id')
    async update(@Body() data : UpdatePutUserDTO, @ParamId() idusers : number){
        return this.userService.update(idusers,data);
    }

    @Patch(':id')
    async patch(@Body() data : UpdatePatchUser, @ParamId() idusers: number){
        return this.userService.patch(idusers, data);
    }

    @Delete(':id')
    async delete(@ParamId() idusers : number){
        return this.userService.delete(idusers);
    }
}