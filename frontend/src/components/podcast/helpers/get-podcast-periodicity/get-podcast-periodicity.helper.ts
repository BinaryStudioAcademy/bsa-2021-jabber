import { PodcastPeriodicity } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { ONE_DAY, ONE_WEEK } from './common/constants';
import { getDifferenceInDays } from 'helpers/helpers';

const getPodcastPeriodicity = (episodes: Episode[]): PodcastPeriodicity => {
  if (!episodes.length) {
    return PodcastPeriodicity.WEEKLY;
  }

  const episodesSortedByDate = [...episodes].sort(
    (prev, next) =>
      new Date(prev.createdAt).getTime() - new Date(next.createdAt).getTime(),
  );

  const [firstEpisode] = episodesSortedByDate;

  const averagePeriodicity = Math.round(
    (Date.now() - new Date(firstEpisode.createdAt).getTime()) /
      (episodesSortedByDate.length),
  );

  const differenceInDays = getDifferenceInDays(averagePeriodicity, 0);

  if (differenceInDays <= ONE_DAY) {
    return PodcastPeriodicity.DAILY;
  }

  if (differenceInDays <= ONE_WEEK) {
    return PodcastPeriodicity.WEEKLY;
  }

  return PodcastPeriodicity.MONTHLY;
};

export { getPodcastPeriodicity };
