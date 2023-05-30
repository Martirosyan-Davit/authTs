import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilsProvider } from 'src/providers/utils.provider';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }


    //Find single user
    // findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    //     return this.usersRepository.findOneBy(findData)
    // }

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const email = createUserDto.email
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', {email})
            .getOne();

        if(user) 
            throw new HttpException('User already created', HttpStatus.BAD_REQUEST);

        const userEntity =  this.userRepository.create(createUserDto);
        
        userEntity.password = UtilsProvider.generateHash(userEntity.password);


        return await this.userRepository.save(userEntity);
    }


    async update(updateUserDto: UpdateUserDto, id: string): Promise<UserEntity> {
        if (!isUUID(id))
            throw new HttpException('User id not found', HttpStatus.BAD_REQUEST);

        const userEntity = this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!userEntity)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        this.userRepository
            .merge(
                await userEntity,
                updateUserDto
            );

        this.userRepository
            .save(await userEntity);

        return userEntity;

    }

    async deleteById(id: string): Promise<UserEntity | null> {
        if (!isUUID(id))
            throw new HttpException('user id is incorrect', HttpStatus.BAD_REQUEST);

        const currentUser = this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if ((await currentUser).id != id)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        this.userRepository.delete(id);

        return currentUser;
    }

    async findById(id: string): Promise<UserEntity | null> {
        if (!isUUID(id))
            throw new HttpException('user id is incorrect', HttpStatus.BAD_REQUEST);

        const userEntity = this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!userEntity)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        return userEntity;
    }

    async gelAll(id: string): Promise<UserEntity[]> {
        if (!isUUID(id))
            throw new HttpException('user id is incorrect', HttpStatus.BAD_REQUEST);

        const currentUser = this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if ((await currentUser).admin)
              return await this.userRepository
                  .createQueryBuilder('users')
                  .getMany();
    }





}


