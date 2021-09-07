import { PlaylistPayload } from '~/common/types/types';
import { PlaylistStatus } from '~/common/enums/enums';

type PlaylistEditDTOPayload = {
  name: string;
  description: string;
  status: PlaylistStatus;
  coverId: number | null;
};

export type { PlaylistEditDTOPayload };
