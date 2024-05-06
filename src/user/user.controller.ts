import {Controller, Post, Body, Get, Param, Put, Patch, Delete} from "@nestjs/common"

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() body : JSON){
        return {body};
    }

    @Get()
    async read(){
        return {users:[]}
    }

    @Get(':id')
    async readOne(@Param() params : JSON){
        return {user:{}, params}
    }

    @Put(':id')
    async updade(@Body() body : JSON, @Param() params: JSON){
        return {
            method: 'put',
            body, 
            params
        }
    }

    @Patch(':id')
    async patch(@Body() body : JSON, @Param() params: JSON){
        return {
            method: 'patch',
            body, 
            params
        }
    }

    @Delete(':id')
    async delete(@Param() params : JSON){
        return {
            params
        }
    }
}