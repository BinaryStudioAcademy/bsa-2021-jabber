import { TableName, ShownoteDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Shownote extends Abstract {
  [ShownoteDTOKey.NAME]: string;

  [ShownoteDTOKey.EPISODE_ID]: number;

  [ShownoteDTOKey.TIMESTAMP]: number;

  static get tableName(): string {
    return TableName.SHOW_NOTES;
  }
}

export { Shownote };
