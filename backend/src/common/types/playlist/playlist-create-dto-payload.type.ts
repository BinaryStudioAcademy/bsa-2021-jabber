import { PlaylistStatus } from '~/common/enums/enums';

type PlaylistCreateDTOPayload = {
  name: string;
  description: string;
  status: PlaylistStatus;
  coverId: number | null;
  userId: number;
};

export type { PlaylistCreateDTOPayload };
