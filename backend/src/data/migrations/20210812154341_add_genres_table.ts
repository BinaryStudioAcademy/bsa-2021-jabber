import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';

const TABLE_NAME = 'genres';

const GENRES = [
  { name: 'Cinema', key: 'CINEMA' },
  { name: 'Books', key: 'BOOKS' },
  { name: 'Technologies', key: 'TECHNOLOGIES' },
  { name: 'Psychologies', key: 'PSYCHOLOGIES' },
  { name: 'Relationship', key: 'RELATIONSHIP' },
  { name: 'Education', key: 'EDUCATION' },
  { name: 'Music', key: 'MUSIC' },
  { name: 'Culture', key: 'CULTURE' },
  { name: 'Humor', key: 'HUMOR' },
  { name: 'History', key: 'HISTORY' },
  { name: 'News', key: 'NEWS' },
  { name: 'Games', key: 'GAMES' },
  { name: 'Sex', key: 'SEX' },
  { name: 'Business', key: 'BUSINESS' },
  { name: 'Science', key: 'SCIENCE' },
  { name: 'Politics', key: 'POLITICS' },
  { name: 'Personal', key: 'PERSONAL' },
  { name: 'Interview', key: 'INTERVIEW' },
  { name: 'Travels', key: 'TRAVELS' },
  { name: 'Sport', key: 'SPORT' },
];

export async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('key').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.dateTime('updated_at').notNullable().defaultTo(dateNowISO);
  }).then(() => knex(TABLE_NAME).insert(GENRES));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

