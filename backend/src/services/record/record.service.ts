import { Record as TRecord, RecordCreatePayload } from '~/common/types/types';
import { record as recordRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode, ErrorMessage } from '~/common/enums/enums';

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

  public async getByEpisodeId(id: string): Promise<TRecord> {
    const record = await this.#recordRepository.getByEpisodeId(id);
    if (!record) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.RECORD_NOT_FOUND,
      });
    }
    return record;
  }
}

export { Record };
