import { EpisodeType, EpisodeStatus } from '~/common/enums/enums';

type EpisodeEditDTOPayload = {
  name: string;
  description: string;
  type: EpisodeType;
  imageId: number | null;
  status: EpisodeStatus;
};

export type { EpisodeEditDTOPayload };
