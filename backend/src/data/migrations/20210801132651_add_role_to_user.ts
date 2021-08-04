import { Knex } from 'knex';

const UserRole = {
  USER: 'user',
  MASTER: 'master',
} as const;

const TABLE_NAME = 'users';
const COLUMN_NAME = 'role';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, [UserRole.USER, UserRole.MASTER])
      .defaultTo(UserRole.USER);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
