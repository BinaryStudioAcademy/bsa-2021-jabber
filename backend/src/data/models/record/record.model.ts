import { TableName, RecordDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Record extends Abstract {
  [RecordDTOKey.FILE_URL]: string;

  [RecordDTOKey.FILE_SIZE]: number;

  [RecordDTOKey.EPISODE_ID]: number;

  static get tableName(): string {
    return TableName.RECORDS;
  }
}

export { Record };
