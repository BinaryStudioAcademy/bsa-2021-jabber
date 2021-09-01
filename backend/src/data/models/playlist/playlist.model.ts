import {
  TableName,
  PlaylistDTOKey,
} from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Playlist extends Abstract {
  [PlaylistDTOKey.USER_ID]: number;

  [PlaylistDTOKey.NAME]: string;

  static get tableName(): string {
    return TableName.PLAYLISTS;
  }

}

export { Playlist };
