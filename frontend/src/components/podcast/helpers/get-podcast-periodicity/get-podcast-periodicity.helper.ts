import { PodcastPeriodicity } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { ONE_DAY, ONE_WEEK } from './common/constants';
import { getDifferenceInDays } from 'helpers/helpers';

const getPodcastPeriodicity = (episodes: Episode[]): PodcastPeriodicity => {
  if (!episodes.length) {
    return PodcastPeriodicity.MONTHLY;
  }

  const episodesSortedByDate = [...episodes].sort(
    (prev, next) =>
      new Date(prev.createdAt).getTime() - new Date(next.createdAt).getTime(),
  );

  const [firstEpisode] = episodesSortedByDate;
  const lastEpisode = episodesSortedByDate[episodesSortedByDate.length - 1];

  const averagePeriodicity = Math.round(
    (new Date(lastEpisode.createdAt).getTime() -
      new Date(firstEpisode.createdAt).getTime()) /
      (episodesSortedByDate.length - 1),
  );
  const periodFromLastPodcast =
    Date.now() - new Date(lastEpisode.createdAt).getTime();

  const estimatedPeriodicity =
    episodesSortedByDate.length === 1
      ? periodFromLastPodcast
      : Math.max(averagePeriodicity, periodFromLastPodcast);

  const differenceInDays = getDifferenceInDays(estimatedPeriodicity, 0);

  if (differenceInDays <= ONE_DAY) {
    return PodcastPeriodicity.DAILY;
  }

  if (differenceInDays <= ONE_WEEK) {
    return PodcastPeriodicity.WEEKLY;
  }

  return PodcastPeriodicity.MONTHLY;
};

export { getPodcastPeriodicity };
