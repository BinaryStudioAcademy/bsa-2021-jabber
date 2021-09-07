import { Playlist, PlaylistFormPayload } from 'common/types/types';

const mapPlaylistToFormPayload = (playlist: Playlist): PlaylistFormPayload => ({
  name: playlist.name,
  description: playlist.description,
  cover: null,
  status: playlist.status,
  invitationCode: '',
});

export { mapPlaylistToFormPayload };
