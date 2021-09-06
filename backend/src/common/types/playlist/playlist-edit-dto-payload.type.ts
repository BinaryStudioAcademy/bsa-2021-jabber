import { PlaylistPayload } from '~/common/types/types';

type PlaylistEditDTOPayload = PlaylistPayload & {
  coverId: number | null;
};

export type { PlaylistEditDTOPayload };
