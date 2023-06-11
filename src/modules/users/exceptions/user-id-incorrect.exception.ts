import { BadRequestException } from "@nestjs/common";


export class UserIdIncorrectException extends BadRequestException {
    constructor(error?: string) {
      super('user id is incorrect', error);
    }
  }