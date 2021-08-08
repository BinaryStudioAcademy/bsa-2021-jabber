import { Knex } from 'knex';

const PodcastType = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  UNLISTED: 'unlisted',
} as const;

const TABLE_NAME = 'podcasts';
const COLUMN_NAME = 'type';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, [PodcastType.PUBLIC, PodcastType.PRIVATE, PodcastType.UNLISTED])
      .defaultTo(PodcastType.PUBLIC);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
