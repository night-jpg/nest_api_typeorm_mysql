import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUser } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService){}

    async create({email, name, password} : CreateUserDTO) {
        return await this.prisma.user.create({
            data:{
                email,
                name,
                password
            },
        });
    }

    async list(){
        return this.prisma.user.findMany();
    }

    async show(idusers : number){
        return this.prisma.user.findUnique({
            where: {
                idusers,
            }
        });
    }

    async update(idusers: number, {email, name, password, birthDay}: UpdatePutUserDTO){

        await this.exists(idusers);

        return this.prisma.user.update({
            data: {email, name, password,birthDay: birthDay ? new Date(birthDay) : null,updatedAt: new Date()},
            where: {
                idusers
            }
        })
    }

    async patch(idusers: number, {email, name, password, birthDay}: UpdatePatchUser){
        
        await this.exists(idusers);

        const data: any = {};

        email && (data.email = email);
        name && (data.name = name);
        password && (data.password = password);
        birthDay && (data.birthDay = new Date(birthDay));
        
        return this.prisma.user.update({
            data: data,
            where: {
                idusers
            }
        })
    }

    async delete(idusers:number){

        await this.exists(idusers);
        
        return this.prisma.user.delete({
            where: {
                idusers
            }
        })
    }

    async exists(idusers: number){
        if(!(await this.show(idusers))){
            throw new NotFoundException("O usuário com esse id não");
        }
    }
}