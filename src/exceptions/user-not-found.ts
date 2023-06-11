import { NotFoundException } from "@nestjs/common";

export class UserNotFound extends NotFoundException {
  constructor(error?: string) {
    super('error.userNotFound', error);
  }
}