import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnChannel1770366936603 implements MigrationInterface {
    name = 'AddColumnChannel1770366936603';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historical_price" ADD "channel" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historical_price" DROP COLUMN "channel"`);
    }

}
