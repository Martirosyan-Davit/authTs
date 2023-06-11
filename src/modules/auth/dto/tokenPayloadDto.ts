import { ApiProperty } from "@nestjs/swagger";

export class TokenPayloadDto {

    @ApiProperty()
    accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}