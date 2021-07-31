import { RecordModel as RecordM } from '~/data/models/models';
import { Record as TRecord, RecordCreatePayload } from '~/common/types/types';

type Constructor = {
  RecordModel: typeof RecordM;
};

class Record {
  #RecordModel: typeof RecordM;

  constructor({ RecordModel }: Constructor) {
    this.#RecordModel = RecordModel;
  }

  public getAll(): Promise<TRecord[]> {
    return this.#RecordModel.query();
  }

  public create(payload: RecordCreatePayload): Promise<TRecord> {
    return this.#RecordModel.query().insert(payload);
  }
}

export { Record };
