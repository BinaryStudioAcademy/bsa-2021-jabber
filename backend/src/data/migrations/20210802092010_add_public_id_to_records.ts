import { Knex } from 'knex';

const TABLE_NAME = 'records';
const COLUMN_NAME = 'public_id';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
