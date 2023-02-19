import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IsEmailAlreadyExistConstraint } from './validators/isEmailExist';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersService, IsEmailAlreadyExistConstraint],
  exports: [UsersService]
})
export class UsersModule { }
