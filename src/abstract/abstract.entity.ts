import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class AbstractEntity{
    @ApiProperty({example: 214, description:'unique identifier'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @ApiProperty({example: '', description:''})
    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    // @ApiProperty({example: ' ', description:' '})
    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;
}