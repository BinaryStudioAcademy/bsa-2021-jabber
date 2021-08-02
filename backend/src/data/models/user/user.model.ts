import { TableName, UserDTOKey } from '~/common/enums/enums';
import { UserRole } from '~/common/enums/user/user';
import { Abstract } from '../abstract/abstract.model';

class User extends Abstract {
  [UserDTOKey.FIRST_NAME]: string;

  [UserDTOKey.LAST_NAME]: string;

  [UserDTOKey.NICKNAME]: string;

  [UserDTOKey.BIRTHDATE]: string;

  [UserDTOKey.EMAIL]: string;

  [UserDTOKey.PASSWORD]: string;

  [UserDTOKey.ROLE]: UserRole;

  static get tableName(): string {
    return TableName.USERS;
  }
}

export { User };
