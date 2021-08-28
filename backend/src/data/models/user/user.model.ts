import { Model } from 'objection';
import { TableName, UserDTOKey } from '~/common/enums/enums';
import { UserRole } from '~/common/enums/user/user';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';
import { UserFollower } from '~/data/models/user-follower/user-follower.model';

class User extends Abstract {
  [UserDTOKey.FIRST_NAME]: string;

  [UserDTOKey.LAST_NAME]: string;

  [UserDTOKey.NICKNAME]: string;

  [UserDTOKey.IMAGE_ID]: number | null;

  [UserDTOKey.BIRTHDATE]: string;

  [UserDTOKey.EMAIL]: string;

  [UserDTOKey.PASSWORD]: string;

  [UserDTOKey.ROLE]: UserRole;

  [UserDTOKey.BIO]: string;

  [UserDTOKey.IMAGE]: Image | null;

  static get tableName(): string {
    return TableName.USERS;
  }

  static relationMappings = {
    image: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'users.image_id',
        to: 'images.id',
      },
    },
    popularUsers: {
      relation: Model.HasManyRelation,
      modelClass: UserFollower,
      join: {
        from: 'users.id',
        to: 'users_followers.user_id',
      },
    },
    followers: {
      relation: Model.HasOneRelation,
      modelClass: UserFollower,
      join: {
        from: 'users.id',
        to: 'users_followers.follower_id',
      },
    },
  };
}

export { User };
