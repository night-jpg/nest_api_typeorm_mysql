import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUser } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) { }

    async create(data: CreateUserDTO) {

        if (await this.usersRepository.exists({
            where: {
                email: data.email
            }
        })) {
            throw new BadRequestException("O email já está sendo usado");
        }
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        const user = this.usersRepository.create(data)
        return this.usersRepository.save(user)
    }

    async list() {
        return this.usersRepository.find();
    }

    async show(idusers: number) {
        await this.exists(idusers);
        return this.usersRepository.findOneBy({
            idusers,
        });
    }

    async update(idusers: number, { email, name, password, birthDay, role }: UpdatePutUserDTO) {

        await this.exists(idusers);

        password = await bcrypt.hash(password, await bcrypt.genSalt());

        await this.usersRepository.update(idusers, {
            email,
            name,
            password,
            birthDay: birthDay ? new Date(birthDay) : null,
            role
        },
        )

        return this.show(idusers);
    }

    async patch(idusers: number, { email, name, password, birthDay, role }: UpdatePatchUser) {

        await this.exists(idusers);

        const data: any = {};

        email && (data.email = email);
        name && (data.name = name);
        password && (data.password = await bcrypt.hash(password, await bcrypt.genSalt()));
        birthDay && (data.birthDay = new Date(birthDay));
        role && (data.role = role);

        await this.usersRepository.update(idusers, data)

        return this.show(idusers);
    }

    async delete(idusers: number) {

        await this.exists(idusers)

        const user = await this.show(idusers)

        await this.usersRepository.delete(idusers)

        return user

    }

    async exists(idusers: number) {

        if (!(await this.usersRepository.exists({
            where: {
                idusers
            }
        }))) {
            throw new NotFoundException("O usuário com esse id não existe");
        }
    }
}