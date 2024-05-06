import {Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUser } from "./dto/update-patch-user.dto";

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() {email, name, password} : CreateUserDTO){
        return {email,name,password};
    }

    @Get()
    async read(){
        return {users:[]}
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id : number){
        return {user:{}, id}
    }

    @Put(':id')
    async update(@Body() {email, name, password} : UpdatePutUserDTO, @Param('id', ParseIntPipe) id : number){
        return {
            method: 'put',
            email, name, password, 
            id
        }
    }

    @Patch(':id')
    async patch(@Body() {email, name, password} : UpdatePatchUser, @Param('id', ParseIntPipe) id : number){
        return {
            method: 'patch',
            email, name, password, 
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id : number){
        return {
            id
        }
    }
}