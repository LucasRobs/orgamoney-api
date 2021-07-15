import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBill1626306774857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bill',
        columns: [
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'expiration',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'note',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'double',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('bill');
  }
}
