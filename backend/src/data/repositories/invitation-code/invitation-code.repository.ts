import {
  InvitationCode as TInvitationCode,
  InvitationCodePayload,
} from '~/common/types/types';
import { InvitationCodeModel as InvitationCodeM } from '~/data/models/models';

type Constructor = {
  InvitationCodeModel: typeof InvitationCodeM;
};

class InvitationCode {
  #InvitationCodeModel: typeof InvitationCodeM;

  constructor({ InvitationCodeModel }: Constructor) {
    this.#InvitationCodeModel = InvitationCodeModel;
  }

  public create(payload: InvitationCodePayload): Promise<TInvitationCode> {
    return this.#InvitationCodeModel.query().insert(payload);
  }

  public update({ podcastId, code }: InvitationCodePayload): Promise<number> {
    return this.#InvitationCodeModel.query()
      .patch({ code })
      .where('podcast_id', podcastId);
  }

  public delete(podcastId: number): Promise<number> {
    return this.#InvitationCodeModel.query()
      .delete()
      .where('podcast_id', podcastId);
  }

  public getByCode(code: string): Promise<TInvitationCode> {
    return this.#InvitationCodeModel.query().findOne({ 'code': code });
  }
}

export { InvitationCode };
