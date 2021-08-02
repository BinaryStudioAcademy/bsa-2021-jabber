import { TableName, ImageDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Image extends Abstract {
  [ImageDTOKey.URL]: string;

  [ImageDTOKey.PUBLIC_ID]: string;

  static get tableName(): string {
    return TableName.IMAGES;
  }
}

export { Image };
