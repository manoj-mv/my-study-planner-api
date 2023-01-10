import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    user_name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
