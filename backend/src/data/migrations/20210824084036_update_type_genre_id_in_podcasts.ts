import { Knex } from 'knex';

const TABLE_NAME = 'podcasts';
const COLUMN_NAME = 'genre_id';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, function(table) {
    table.integer(COLUMN_NAME)
      .notNullable()
      .alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, function(table) {
    table.integer(COLUMN_NAME)
      .defaultTo(null)
      .alter();
  });
}
