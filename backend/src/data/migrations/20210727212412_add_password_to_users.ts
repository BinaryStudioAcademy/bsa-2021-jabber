import { Knex } from 'knex';

const TABLE_NAME = 'users';
const COLUMN_NAME = 'password';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
