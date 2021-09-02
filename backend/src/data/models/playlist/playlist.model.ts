import { Model } from 'objection';
import {
  TableName,
  PlaylistDTOKey,
  PlaylistStatus,
} from '~/common/enums/enums';
import { Image } from '~/data/models/image/image.model';
import { Abstract } from '../abstract/abstract.model';

class Playlist extends Abstract {
  [PlaylistDTOKey.USER_ID]: number;

  [PlaylistDTOKey.NAME]: string;

  [PlaylistDTOKey.COVER_ID]: number | null;

  [PlaylistDTOKey.DESCRIPTION]: string;

  [PlaylistDTOKey.STATUS]: PlaylistStatus;

  [PlaylistDTOKey.COVER]: Image | null;

  static get tableName(): string {
    return TableName.PLAYLISTS;
  }

  static relationMappings = {
    cover: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'playlists.cover_id',
        to: 'images.id',
      },
    },
  };
}

export { Playlist };
