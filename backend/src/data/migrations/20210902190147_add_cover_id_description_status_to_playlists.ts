import { Knex } from 'knex';

const TABLE_NAME = 'playlists';

const PlaylistStatus = {
  PUBLISHED: 'published',
  STAGING: 'staging',
} as const;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table
      .integer('cover_id')
      .references('id')
      .inTable('images')
      .defaultTo(null);
    table.text('description').notNullable();
    table
      .enum('status', [PlaylistStatus.PUBLISHED, PlaylistStatus.STAGING])
      .defaultTo(PlaylistStatus.STAGING);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn('status');
    table.dropColumn('description');
    table.dropColumn('cover_id');
  });
}
