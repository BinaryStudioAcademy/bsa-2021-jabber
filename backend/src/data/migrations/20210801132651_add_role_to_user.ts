import { Knex } from 'knex';

const TABLE_NAME = 'users';
const COLUMN_NAME = 'role';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.enum(COLUMN_NAME, ['user', 'master']).defaultTo('user');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
