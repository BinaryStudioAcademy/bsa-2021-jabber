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

  public getByEpisodeId(id: number): Promise<TRecord> {
    return this.#RecordModel.query().findOne({ episode_id: id });
  }

  public delete(id: number): Promise<TRecord> {
    return this.#RecordModel.query().deleteById(id).returning('*').first();
  }
}

export { Record };
