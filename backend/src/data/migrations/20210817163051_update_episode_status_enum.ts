import { Knex } from 'knex';

const TABLE_NAME = 'episodes';
const COLUMN_NAME = 'status';

const EpisodeStatus = {
  PUBLISHED: 'published',
  STAGING: 'staging',
  LIVE: 'live',
} as const;

const formatAlterTableEnumSql = (
  TABLE_NAME: string,
  COLUMN_NAME: string,
  EpisodeStatus: string[],
) => {
  const constraintName = `${TABLE_NAME}_${COLUMN_NAME}_check`;
  return [
    `ALTER TABLE ${TABLE_NAME} DROP CONSTRAINT IF EXISTS ${constraintName};`,
    `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT ${constraintName} CHECK (${COLUMN_NAME} = ANY (ARRAY['${EpisodeStatus.join(
      "'::text, '"
    )}'::text]));`,
  ].join('\n');
};

export async function up(knex: Knex): Promise<void> {
  return await knex.raw(
    formatAlterTableEnumSql(TABLE_NAME, COLUMN_NAME, [
      EpisodeStatus.PUBLISHED,
      EpisodeStatus.STAGING,
      EpisodeStatus.LIVE,
    ])
  );

}

export async function down(knex: Knex): Promise<void> {
  return await knex.raw(
    formatAlterTableEnumSql(TABLE_NAME, COLUMN_NAME, [
      EpisodeStatus.PUBLISHED,
      EpisodeStatus.STAGING,
    ])
  );
}
