import { Record as TRecord, RecordCreatePayload } from '~/common/types/types';
import { record as recordRep } from '~/data/repositories/repositories';

type Constructor = {
  recordRepository: typeof recordRep;
};

class Record {
  #recordRepository: typeof recordRep;

  constructor({ recordRepository }: Constructor) {
    this.#recordRepository = recordRepository;
  }

  public getAll(): Promise<TRecord[]> {
    return this.#recordRepository.getAll();
  }

  public create(payload: RecordCreatePayload): Promise<TRecord> {
    return this.#recordRepository.create(payload);
  }
}

export { Record };
