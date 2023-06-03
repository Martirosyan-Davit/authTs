import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/user.module";
import { UserEntity } from "./modules/users/user.entity";


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USER,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DB,
      entities: [UserEntity],
      synchronize: true,
      migrations: ['src/migrations/*{.ts,.js}'],

    }),
    UsersModule,
  ],
})
export class AppModule { };