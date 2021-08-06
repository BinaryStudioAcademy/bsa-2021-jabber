import { Knex } from "knex";

const TABLE_NAME = 'episodes';
const COLUMN_NAME = 'image_id';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .integer(COLUMN_NAME)
      .references('id')
      .inTable('images')
      .defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

