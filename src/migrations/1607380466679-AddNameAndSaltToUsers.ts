import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNameAndSaltToUsers1607380466679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'name',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'salt',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'salt');
    await queryRunner.dropColumn('users', 'name');
  }
}
