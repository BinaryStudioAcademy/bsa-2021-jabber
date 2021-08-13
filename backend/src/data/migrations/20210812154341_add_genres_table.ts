import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';

const TABLE_NAME = 'genres';

const GENRES = [
  { name: 'Cinema', key: 'cinema' },
  { name: 'Books', key: 'books' },
  { name: 'Technologies', key: 'technologies' },
  { name: 'Psychologies', key: 'psychologies' },
  { name: 'Relationship', key: 'relationship' },
  { name: 'Education', key: 'education' },
  { name: 'Music', key: 'music' },
  { name: 'Culture', key: 'culture' },
  { name: 'Humor', key: 'humor' },
  { name: 'History', key: 'history' },
  { name: 'News', key: 'news' },
  { name: 'Games', key: 'games' },
  { name: 'Sex', key: 'sex' },
  { name: 'Business', key: 'business' },
  { name: 'Science', key: 'science' },
  { name: 'Politics', key: 'politics' },
  { name: 'Personal', key: 'personal' },
  { name: 'Interview', key: 'interview' },
  { name: 'Travels', key: 'travels' },
  { name: 'Sport', key: 'sport' },
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

