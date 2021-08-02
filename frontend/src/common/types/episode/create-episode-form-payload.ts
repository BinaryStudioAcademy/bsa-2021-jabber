import { EpisodeCreatePayloadKey } from '../../enums/enums';

type EpisodeCreateFormPayload = {
  [EpisodeCreatePayloadKey.NAME]: string;
};

export type { EpisodeCreateFormPayload };
