import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';

const TABLE_NAME = 'genres';

export async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('key').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.dateTime('updated_at').notNullable().defaultTo(dateNowISO);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

