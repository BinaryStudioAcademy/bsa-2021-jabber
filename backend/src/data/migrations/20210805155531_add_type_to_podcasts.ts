import { Knex } from 'knex';

const PodcastsType = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  UNLISTED: 'unlisted',
} as const;

const TABLE_NAME = 'podcasts';
const COLUMN_NAME = 'type';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, [PodcastsType.PUBLIC, PodcastsType.PRIVATE, PodcastsType.UNLISTED])
      .defaultTo(PodcastsType.PUBLIC);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
