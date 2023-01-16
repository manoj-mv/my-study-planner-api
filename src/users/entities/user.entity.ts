import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt';
@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    user_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: '' })
    image: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 13);
    }
}
