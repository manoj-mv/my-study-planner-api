import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGaurd } from './local-auth-gaurd';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserResponse } from 'src/users/interfaces/create-user-response.interface';
import { UsersService } from 'src/users/users.service';


@Controller('auth')
export class AuthController {

    constructor(
        private usersService: UsersService
    ) { }
    @UseGuards(LocalAuthGaurd)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
        return await this.usersService.create(createUserDto);
    }
}
