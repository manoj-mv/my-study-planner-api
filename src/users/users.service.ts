import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './../users/types/tokens.types'
import { CreateUserResponse } from './interfaces/create-user-response.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const newUser = new User();
    Object.assign(newUser, createUserDto);
    const user = await this.userRepository.save(newUser);
    return this.buildUserReponse(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    })
  }

  async buildUserReponse(user: User): Promise<CreateUserResponse> {
    const tokens = await this.generateJwtTokens(user.user_id, user.email);
    this.updateRtHash(tokens.refreshToken, user.user_id);
    return {
      tokens: tokens
    }
  }

  async generateJwtTokens(userId: string, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 15 * 60,
          secret: this.configService.get('ACCESS_T_SECRET')
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: this.configService.get('REFRESH_T_SECRET')
        }
      ),
    ])

    return {
      accessToken,
      refreshToken
    }
  }

  async updateRtHash(refreshToken: string, userId: string) {
    const hashRt = await hash(refreshToken, 13);
    const user = await this.userRepository.findOne({
      where: {
        user_id: userId
      }
    });
    user.refresh_token = hashRt;
    this.userRepository.save(user);
  }
}
