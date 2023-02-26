import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGaurd } from './local-auth-gaurd';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserResponse } from 'src/users/interfaces/create-user-response.interface';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RefreshTokenGaurd } from './refresh-token-gaurd';


@Controller('auth')
export class AuthController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
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

    @UseGuards(RefreshTokenGaurd)
    @Get('refresh-tk')
    async refresh(@Req() req) {
        // console.log(req.user['sub'], req.user['refreshToken']);
        console.log('reached 0');

        const email = req.user['email'];
        const rt = req.user['refreshToken'];
        console.log(email, rt);

        return await this.authService.refreshToken(email, rt)
    }
}
