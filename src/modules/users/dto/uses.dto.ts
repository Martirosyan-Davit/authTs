import { RoleType } from "src/common/costants/role.type";
import { AbstractDto } from "src/common/dto/abstract.dto";
import { UserEntity } from "../user.entity";

export class UserDto extends AbstractDto {

    name: string;

    email: string;

    role: RoleType;

    constructor(user: UserEntity) {
        super(user);
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
    }

}