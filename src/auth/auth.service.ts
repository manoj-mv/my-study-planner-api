import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByName(email);

        if (user && await compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
