import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "../../common/abstract.entity";
import { RoleType } from "../../common/constants/role.type";
import { Column, Entity } from "typeorm";
import { UserDto } from "./dto/uses.dto";
import { UseDto } from "../../decorater/use-dto.dekorater";



@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> {

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;
}