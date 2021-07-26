import { Knex } from 'knex';
import { formatISO } from 'date-fns';

const TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<void> {
  const dateNowISO = formatISO(new Date());

  return knex.schema
    .createTable(TABLE_NAME, table => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('second_name').notNullable();
      table.string('nickname').notNullable();
      table.date('birth_date').notNullable();
      table.string('email').notNullable();
      table.string('phone');
      table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
      table.dateTime('updated_at').notNullable().defaultTo(dateNowISO);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
