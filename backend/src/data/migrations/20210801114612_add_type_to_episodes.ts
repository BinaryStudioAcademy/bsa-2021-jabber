import { Knex } from 'knex';

const TABLE_NAME = 'episodes';
const COLUMN_NAME = 'type';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.enu(COLUMN_NAME, ['public', 'private', 'unlisted']).defaultTo('public');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
