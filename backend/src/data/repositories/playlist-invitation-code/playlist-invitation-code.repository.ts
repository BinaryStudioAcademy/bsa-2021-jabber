import {
  PlaylistInvitationCode as TPlaylistInvitationCode,
  PlaylistInvitationCodePayload,
} from '~/common/types/types';
import { PlaylistInvitationCodeModel as PlaylistInvitationCodeM } from '~/data/models/models';

type Constructor = {
  PlaylistInvitationCodeModel: typeof PlaylistInvitationCodeM;
};

class PlaylistInvitationCode {
  #PlaylistInvitationCodeModel: typeof PlaylistInvitationCodeM;

  constructor({ PlaylistInvitationCodeModel }: Constructor) {
    this.#PlaylistInvitationCodeModel = PlaylistInvitationCodeModel;
  }

  public create(payload: PlaylistInvitationCodePayload): Promise<TPlaylistInvitationCode> {
    return this.#PlaylistInvitationCodeModel.query().insert(payload);
  }

  public update({ playlistId, code }: PlaylistInvitationCodePayload): Promise<number> {
    return this.#PlaylistInvitationCodeModel.query()
      .patch({ code })
      .where('playlist_id', playlistId);
  }

  public delete(podcastId: number): Promise<number> {
    return this.#PlaylistInvitationCodeModel.query()
      .delete()
      .where('playlist_id', podcastId);
  }

  public getByCode(code: string): Promise<TPlaylistInvitationCode> {
    return this.#PlaylistInvitationCodeModel.query().findOne({ 'code': code });
  }

  public getByPlaylistId(playlistId: number): Promise<TPlaylistInvitationCode> {
    return this.#PlaylistInvitationCodeModel.query().findOne('playlist_id', playlistId);
  }
}

export { PlaylistInvitationCode };
