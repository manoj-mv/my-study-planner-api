import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (user && await compare(password, user.password)) {
            const loginResp = this.userService.buildUserReponse(user);
            return loginResp;
        }
        return null;
    }

    async refreshToken(email: string, refreshToken: string) {
        const user = await this.userService.findByEmail(email);
        console.log(user);

        if (!user || !user.refresh_token) {
            console.log('reached');

            throw new ForbiddenException('Access Denied.')
        }

        const refreshTokenMatches = await compare(refreshToken, user.refresh_token);

        if (!refreshTokenMatches) {
            console.log('reached 1');
            throw new ForbiddenException('Access Denied.')
        } else {
            return this.userService.buildUserReponse(user);
        }
    }
}
