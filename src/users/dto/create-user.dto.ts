import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsEmailAlreadyExist } from '../validators/isEmailExist';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly user_name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsEmailAlreadyExist({
        message: "Email already exists."
    })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
