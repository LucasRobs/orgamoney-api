import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMonth1626306768492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mother',
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
    queryRunner.dropTable('month');
  }
}
