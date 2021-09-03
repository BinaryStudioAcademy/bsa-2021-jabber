import { getSortedItems } from 'helpers/helpers';
import { Playlist } from 'common/types/types';

const sortPlaylistsByName = (playlists: Playlist[]): Playlist[] => {
  return getSortedItems(playlists, (a: Playlist, b:Playlist) => a.name.localeCompare(b.name));
};

export { sortPlaylistsByName };
