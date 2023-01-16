import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnImageToUsers1673589838602 implements MigrationInterface {
    name = 'addColumnImageToUsers1673589838602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
