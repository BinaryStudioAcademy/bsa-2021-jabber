import { EpisodeType } from '~/common/enums/enums';

type EpisodeEditDTOPayload = {
  name: string;
  description: string;
  type: EpisodeType;
  imageId: number | null;
};

export type { EpisodeEditDTOPayload };