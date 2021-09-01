import { DateFormatType } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import {
  getDifferenceInDays,
  getDifferenceInWeeks,
  getDifferenceInMonths,
  getFormattedDate,
} from 'helpers/helpers';

const getPodcastPeriodicity = (episodes: Episode[]): string => {
  if (!episodes.length) {
    return 'No data yet';
  }

  const episodesDatesWithoutTime = episodes.map((episode) =>
    getFormattedDate(new Date(episode.createdAt), DateFormatType.ISO_DATE_000Z),
  );
  const uniqueSortedEpisodesDates = [...new Set(episodesDatesWithoutTime)].sort(
    (prev, next) => new Date(prev).getTime() - new Date(next).getTime(),
  );

  const firstDate = uniqueSortedEpisodesDates[0];
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

  if (differenceInDays <= 1) {
    return 'Daily';
  }

  const differenceInWeeks = getDifferenceInWeeks(estimatedPeriodicity, 0);

  if (differenceInWeeks < 1) {
    return `Every ${differenceInDays} days`;
  }

  if (differenceInWeeks === 1) {
    return 'Weekly';
  }

  const differenceInMonths = getDifferenceInMonths(estimatedPeriodicity, 0);

  if (differenceInMonths < 1) {
    return `Every ${differenceInWeeks} weeks`;
  }

  if (differenceInMonths === 1) {
    return 'Monthly';
  }

  if (differenceInMonths < 12) {
    return `Every ${differenceInMonths} months`;
  }

  return 'More than a year 😢';
};

export { getPodcastPeriodicity };
