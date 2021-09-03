import { Model } from 'objection';
import {
  TableName,
  PlaylistDTOKey,
} from '~/common/enums/enums';
import { User } from '../user/user.model';
import { Abstract } from '../abstract/abstract.model';

class Playlist extends Abstract {
  [PlaylistDTOKey.USER_ID]: number;

  [PlaylistDTOKey.NAME]: string;

  [PlaylistDTOKey.USER]: User;

  static get tableName(): string {
    return TableName.PLAYLISTS;
  }

  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'playlists.user_id',
        to: 'users.id',
      },
    },
  };
}

export { Playlist };
