import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";


export const userEntityList: UserEntity[] = [{
    name: 'Muller',
    email: 'muller@gmail.com',
    birthDay: new Date('1998-10-01'),
    idusers: 2,
    password: '$2b$10$zl8ifQLpe/xIKvVl5tmKP.q6n.oA1Gzx5TD5.xMNLMvxZVFrIcZD6',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date()
},{
    name: 'Jose',
    email: 'jose@gmail.com',
    birthDay: new Date('2002-10-01'),
    idusers: 3,
    password: '$2b$10$zl8ifQLpe/xIKvVl5tmKP.q6n.oA1Gzx5TD5.xMNLMvxZVFrIcZD6',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date()
},{
    name: 'Vitinho',
    email: 'vitiho@gmail.com',
    birthDay: new Date('2004-10-01'),
    idusers: 4,
    password: '$2b$10$zl8ifQLpe/xIKvVl5tmKP.q6n.oA1Gzx5TD5.xMNLMvxZVFrIcZD6',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date()
}]