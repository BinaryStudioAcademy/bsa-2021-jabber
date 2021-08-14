import { TableName, GenreDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Genre extends Abstract {
  [GenreDTOKey.NAME]: string;

  [GenreDTOKey.KEY]: string;

  static get tableName(): string {
    return TableName.GENRES;
  }
}

export { Genre };
