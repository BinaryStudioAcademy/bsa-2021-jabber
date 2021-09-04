import { Episode } from 'common/types/types';
import { getSortedItems } from 'helpers/helpers';

const getSortedEpisodes = ( episodes: Episode[]): Episode[] => {
  return getSortedItems(episodes, (episodeA: Episode, episodeB: Episode) => new Date(episodeB.createdAt).getTime() - new Date(episodeA.createdAt).getTime());
};

export { getSortedEpisodes };
