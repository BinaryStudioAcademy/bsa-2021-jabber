import { EpisodeType, EpisodeStatus } from '~/common/enums/enums';
import { Image } from '~/common/types/image/image.type';
import { Record } from '~/common/types/record/record.type';
import { Shownote } from '~/common/types/shownote/shownote.type';

type Episode = {
  id: number;
  name: string;
  userId: number;
  imageId: number | null;
  image: Image | null;
  record: Record | null;
  shownotes: Shownote[] | null;
  status: EpisodeStatus;
  podcastId: number;
  createdAt: string;
  updatedAt: string;
  type: EpisodeType;
  description: string;
};

export type { Episode };
