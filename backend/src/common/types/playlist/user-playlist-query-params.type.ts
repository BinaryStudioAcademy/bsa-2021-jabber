import { PlaylistStatus } from '~/common/enums/enums';

type UserPlaylistQueryParams = {
  user_id: number;
  status?: PlaylistStatus;
};

export type { UserPlaylistQueryParams };
