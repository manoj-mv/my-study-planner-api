import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column({ nullable: true })
    refresh_token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true, default: null })
    updated_at: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 13);
    }
}
