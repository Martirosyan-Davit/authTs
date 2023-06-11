import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilsProvider } from '../../providers/utils.provider';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserIdIncorrectException } from './exceptions/user-id-incorrect.exception';
import { UserAlreadyCreatedException } from './exceptions/user-already-created.exception';
import { UserDto } from './dto/uses.dto';
import { UserLoginDto } from '../auth/dto/UserLoginDto';
import { UserNotFound } from 'src/exceptions/user-not-found';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }


    async validate(userLoginDto: UserLoginDto): Promise<UserDto> {
        const userEntity = await this.userRepository.findOneBy({
            email: userLoginDto.email
        });

        const passwordValid = await UtilsProvider.validatePassword(userLoginDto.password, userEntity.password)

        if (!passwordValid) {
            throw new UserNotFound();

        }
        return userEntity.toDto()
    }

    async register(createUserDto: CreateUserDto): Promise<UserDto | null> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email: createUserDto.email })
            .getOne();

        if (user) {
            throw new UserAlreadyCreatedException();
        }

        const passwordHash = UtilsProvider.generateHash(createUserDto.password);

        const userEntity = this.userRepository.create({
            ...createUserDto,
            password: passwordHash
        });

        await this.userRepository.save(userEntity);

        return userEntity.toDto();

    }


    async update(updateUserDto: UpdateUserDto, id: string): Promise<UserDto> {
        if (!isUUID(id)) {
            throw new UserIdIncorrectException();
        }

        const userEntity = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!userEntity) {
            throw new UserNotFoundException();
        }

        this.userRepository.merge(userEntity, updateUserDto);

        this.userRepository.save(userEntity);

        return userEntity.toDto();
    }

    async deleteById(id: string): Promise<UserDto | null> {
        if (!isUUID(id)) {
            throw new UserIdIncorrectException();
        }
        const currentUser = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (currentUser.id != id) {
            throw new UserNotFoundException();
        }
        this.userRepository.delete(id);

        return currentUser.toDto();
    }

    async findById(id: string): Promise<UserDto | null> {
        if (!isUUID(id)) {
            throw new UserIdIncorrectException();
        }
        const userEntity = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!userEntity) {
            throw new UserNotFoundException();
        }
        return userEntity.toDto();
    }
}


