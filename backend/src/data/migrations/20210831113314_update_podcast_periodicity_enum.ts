import { Knex } from 'knex';

const TABLE_NAME = 'podcasts';
const COLUMN_NAME = 'periodicity';

const PodcastPeriodicity = {
  WEEKLY: 'weekly',
  DAILY: 'daily',
  MONTHLY: 'monthly',
  AUTO: 'auto',
} as const;

const formatAlterTableEnumSql = (
  TABLE_NAME: string,
  COLUMN_NAME: string,
  PodcastPeriodicity: string[],
): string => {
  const constraintName = `${TABLE_NAME}_${COLUMN_NAME}_check`;
  return [
    `ALTER TABLE ${TABLE_NAME} DROP CONSTRAINT IF EXISTS ${constraintName};`,
    `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT ${constraintName} CHECK (${COLUMN_NAME} = ANY (ARRAY['${PodcastPeriodicity.join(
      '\'::text, \'')}'::text]));`,
  ].join('\n');
};

export async function up(knex: Knex): Promise<void> {
  return await knex.raw(
    formatAlterTableEnumSql(TABLE_NAME, COLUMN_NAME, [
      PodcastPeriodicity.WEEKLY,
      PodcastPeriodicity.DAILY,
      PodcastPeriodicity.MONTHLY,
      PodcastPeriodicity.AUTO,
    ]),
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.raw(
    formatAlterTableEnumSql(TABLE_NAME, COLUMN_NAME, [
      PodcastPeriodicity.WEEKLY,
      PodcastPeriodicity.DAILY,
      PodcastPeriodicity.MONTHLY,
      PodcastPeriodicity.AUTO,
    ]),
  );
}

