import { BadRequestException } from "@nestjs/common";


export class UserAlreadyCreatedException extends BadRequestException {
    constructor(error?: string) {
      super('User already created', error);
    }
  }