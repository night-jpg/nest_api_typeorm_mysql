import {Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUser } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() data : CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(':idusers')
    async show(@Param('idusers', ParseIntPipe) idusers : number){
        return this.userService.show(idusers);
    }

    @Put(':id')
    async update(@Body() data : UpdatePutUserDTO, @Param('id', ParseIntPipe) idusers : number){
        return this.userService.update(idusers,data);
    }

    @Patch(':id')
    async patch(@Body() data : UpdatePatchUser, @Param('id', ParseIntPipe) idusers : number){
        return this.userService.patch(idusers, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) idusers : number){
        return this.userService.delete(idusers);
    }
}