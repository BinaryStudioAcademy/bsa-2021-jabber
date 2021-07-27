import { Model, snakeCaseMappers } from 'objection';
import { AbstractDTOKey } from '~/common/enums/enums';
import { getFormattedISODate } from '~/helpers/helpers';

class Abstract extends Model {
  [AbstractDTOKey.ID]: number;

  [AbstractDTOKey.CREATED_AT]: string;

  [AbstractDTOKey.UPDATED_AT]: string;

  static get columnNameMappers(): ReturnType<typeof snakeCaseMappers> {
    return snakeCaseMappers();
  }

  $beforeInsert(): void {
    const date = getFormattedISODate(new Date());
    this.createdAt = date;
    this.updatedAt = date;
  }

  $beforeUpdate(): void {
    this.updatedAt = getFormattedISODate(new Date());
  }
}

export { Abstract };
