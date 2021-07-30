import { Knex } from "knex";
import { getFormattedISODate } from '~/helpers/helpers';

const TABLE_NAME = 'comments';


export async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('body').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('episode_id').notNullable().references('id').inTable('episodes');
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.dateTime('updated_at').notNullable().defaultTo(dateNowISO);
    table.dateTime('deleted_at').notNullable().defaultTo(dateNowISO);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

