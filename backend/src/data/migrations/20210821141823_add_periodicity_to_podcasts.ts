import { Knex } from 'knex';

const TABLE_NAME = 'podcasts';
const COLUMN_NAME = 'periodicity';

const Periodicity = {
  WEEKLY: 'weekly',
  DAILY: 'daily',
  MONTHLY: 'monthly',
} as const;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, [Periodicity.WEEKLY, Periodicity.DAILY, Periodicity.MONTHLY])
      .defaultTo(Periodicity.WEEKLY);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

