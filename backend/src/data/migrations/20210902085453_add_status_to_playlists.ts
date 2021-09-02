import { Knex } from 'knex';

const TABLE_NAME = 'playlists';
const COLUMN_NAME = 'status';

const PlaylistStatus = {
  PUBLISHED: 'published',
  STAGING: 'staging',
} as const;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .enum(COLUMN_NAME, [PlaylistStatus.PUBLISHED, PlaylistStatus.STAGING])
      .defaultTo(PlaylistStatus.STAGING);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
