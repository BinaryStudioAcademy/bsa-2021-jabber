import { Knex } from 'knex';

const EpisodeType = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  UNLISTED: 'unlisted',
} as const;

const TABLE_NAME = 'episodes';
const COLUMN_NAME = 'type';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, [EpisodeType.PUBLIC, EpisodeType.PRIVATE, EpisodeType.UNLISTED])
      .defaultTo(EpisodeType.PUBLIC);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
