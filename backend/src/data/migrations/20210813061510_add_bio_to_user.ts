import { Knex } from 'knex';

const TABLE_NAME = 'users';
const COLUMN_NAME = 'bio';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.text(COLUMN_NAME).defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

