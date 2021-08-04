import { TableName, ShowNotesDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class ShowNotes extends Abstract {
  [ShowNotesDTOKey.NAME]: string;

  [ShowNotesDTOKey.EPISODE_ID]: number;

  [ShowNotesDTOKey.TIMESTAMP]: number;

  static get tableName(): string {
    return TableName.SHOW_NOTES;
  }
}

export { ShowNotes };
