import { Knex } from 'knex';
import { USER_DEFAULT_PASSWORD } from '~/common/constants/constants';
import { encrypt } from '~/helpers/helpers';

const TABLE_NAME = 'users';
const COLUMN_NAME = 'password';

export async function up(knex: Knex): Promise<void> {
  const password = await encrypt(USER_DEFAULT_PASSWORD);

  return knex.schema.table(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).notNullable().defaultTo(password);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}
