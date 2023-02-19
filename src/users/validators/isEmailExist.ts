import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsEmailAlreadyExist', async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UsersService) { }
    async validate(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (user) return false;
        return true;
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}