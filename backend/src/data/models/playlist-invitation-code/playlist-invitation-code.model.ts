import { TableName, PlaylistInvitationCodeDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class PlaylistInvitationCode extends Abstract {
  [PlaylistInvitationCodeDTOKey.PLAYLIST_ID]: number;

  [PlaylistInvitationCodeDTOKey.CODE]: string;

  static get tableName(): string {
    return TableName.PLAYLISTS_INVITATION_CODES;
  }
}

export { PlaylistInvitationCode };
