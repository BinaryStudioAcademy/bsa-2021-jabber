import { TableName, UserDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class User extends Abstract {
  [UserDTOKey.FIRST_NAME]: string;

  [UserDTOKey.LAST_NAME]: string;

  [UserDTOKey.NICKNAME]: string;

  [UserDTOKey.BIRTHDATE]: string;

  [UserDTOKey.EMAIL]: string;

  [UserDTOKey.PASSWORD]: string;

  static get tableName(): string {
    return TableName.USERS;
  }
}

export { User };
