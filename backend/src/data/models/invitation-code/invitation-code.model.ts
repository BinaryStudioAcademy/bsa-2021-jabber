import { TableName, InvitationCodeDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class InvitationCode extends Abstract {
  [InvitationCodeDTOKey.PODCAST_ID]: number;

  [InvitationCodeDTOKey.CODE]: string;

  static get tableName(): string {
    return TableName.INVITATION_CODES;
  }
}

export { InvitationCode };
