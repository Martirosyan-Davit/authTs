import { Uuid } from "../../types";
import { AbstractEntity } from "../abstract.entity";


export abstract class AbstractDto {
    
    id: Uuid;

    createdAt: Date;

    updatedAt: Date;

    constructor(abstractEntity: AbstractEntity) {
        this.id = abstractEntity.id;
        this.createdAt = abstractEntity.createdAt;
        this.updatedAt = abstractEntity.updatedAt;
    }
}