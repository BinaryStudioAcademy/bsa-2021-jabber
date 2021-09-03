import { PodcastPeriodicity } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { THREE_DAYS, TEN_DAYS } from './common/constants';
import { getDifferenceInDays, getSortedItems } from 'helpers/helpers';

const getPodcastPeriodicity = (episodes: Episode[]): PodcastPeriodicity => {
  if (!episodes.length) {
    return PodcastPeriodicity.WEEKLY;
  }

  const episodesSortedByDate = getSortedItems(episodes, (prev, next) => new Date(prev.createdAt).getTime() - new Date(next.createdAt).getTime());

  const [firstEpisode] = episodesSortedByDate;

  const averagePeriodicity = Math.round(
    (Date.now() - new Date(firstEpisode.createdAt).getTime()) /
      (episodesSortedByDate.length),
  );

  const differenceInDays = getDifferenceInDays(averagePeriodicity, 0);

  if (differenceInDays <= THREE_DAYS) {
    return PodcastPeriodicity.DAILY;
  }

  if (differenceInDays <= TEN_DAYS) {
    return PodcastPeriodicity.WEEKLY;
  }

  return PodcastPeriodicity.MONTHLY;
};

export { getPodcastPeriodicity };
