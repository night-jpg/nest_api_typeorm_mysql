import { Role } from "src/enums/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    idusers : number;  

    @Column({
        length: 63
    })
    name : string;

    @Column({
        length: 127,
        unique: true
    })
    email : string; 

    @Column({
        length: 127
    })
    password: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    birthDay: Date;

    @CreateDateColumn()
    createdAt: string; 

    @UpdateDateColumn()
    updatedAt: string; 

    @Column({
        default: Role.User
    })
    role: number;
}