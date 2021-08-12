import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { UserNotificationStatus } from '~/common/enums/enums';

const TABLE_NAME = 'users_notifications';

export async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table
      .integer('notification_id')
      .notNullable()
      .references('id')
      .inTable('notifications');
    table
      .enum('status', [
        UserNotificationStatus.UNCHECKED,
        UserNotificationStatus.CHECKED,
      ])
      .defaultTo(UserNotificationStatus.UNCHECKED);
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.dateTime('updated_at').notNullable().defaultTo(dateNowISO);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
