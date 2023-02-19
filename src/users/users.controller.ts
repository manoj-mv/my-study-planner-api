import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserResponse } from './interfaces/create-user-response.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth-gaurd';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
