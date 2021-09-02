import { DateFormatType, PodcastPeriodicity } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { ONE_DAY, ONE_WEEK } from './common/constants';
import { getDifferenceInDays, getFormattedDate } from 'helpers/helpers';

const getPodcastPeriodicity = (episodes: Episode[]): PodcastPeriodicity => {
  if (!episodes.length) {
    return PodcastPeriodicity.MONTHLY;
  }

  const episodesDatesWithoutTime = episodes.map((episode) =>
    getFormattedDate(new Date(episode.createdAt), DateFormatType.ISO_DATE_000Z),
  );
  const uniqueSortedEpisodesDates = [...new Set(episodesDatesWithoutTime)].sort(
    (prev, next) => new Date(prev).getTime() - new Date(next).getTime(),
  );

  const [firstDate] = uniqueSortedEpisodesDates;
  const lastDate =
    uniqueSortedEpisodesDates[uniqueSortedEpisodesDates.length - 1];

  const averagePeriodicity = Math.round(
    (new Date(lastDate).getTime() - new Date(firstDate).getTime()) /
      (uniqueSortedEpisodesDates.length - 1),
  );
  const periodFromLastPodcast = Date.now() - new Date(lastDate).getTime();

  const estimatedPeriodicity =
    uniqueSortedEpisodesDates.length === 1
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
