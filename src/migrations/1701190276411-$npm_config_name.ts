import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1701190276411 implements MigrationInterface {
  name = ' $npmConfigName1701190276411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('admin', 'moder', 'user') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
