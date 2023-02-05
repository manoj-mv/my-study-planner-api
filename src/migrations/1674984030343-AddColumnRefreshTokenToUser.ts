import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnRefreshTokenToUser1674984030343 implements MigrationInterface {
    name = 'AddColumnRefreshTokenToUser1674984030343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
    }

}
