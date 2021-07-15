import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateYear1626306754151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'year',
        columns: [
          {
            name: 'year',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('year');
  }
}
