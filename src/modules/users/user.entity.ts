import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "src/common/abstract.entity";
import { RoleType } from "src/common/costants/role.type";
import { Column, Entity } from "typeorm";



@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {

    @ApiProperty({example: 'Name', description:'Username'})
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ApiProperty({example: 'user@gmail.com', description:'email'})
    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @ApiProperty({example: 'Dowerh214', description:'Password'})
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @ApiProperty({example: 'true', description:'Admin or note'})
    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;



}