import { DateFormatType } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import {
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
  MONTHS_IN_YEAR,
} from './common/constants';
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
    return 'Daily';
  }

  const differenceInWeeks = getDifferenceInWeeks(estimatedPeriodicity, 0);

  if (differenceInWeeks < ONE_WEEK) {
    return `Every ${differenceInDays} days`;
  }

  if (differenceInWeeks === ONE_WEEK) {
    return 'Weekly';
  }

  const differenceInMonths = getDifferenceInMonths(estimatedPeriodicity, 0);

  if (differenceInMonths < ONE_MONTH) {
    return `Every ${differenceInWeeks} weeks`;
  }

  if (differenceInMonths === ONE_MONTH) {
    return 'Monthly';
  }

  if (differenceInMonths < MONTHS_IN_YEAR) {
    return `Every ${differenceInMonths} months`;
  }

  return 'More than a year 😢';
};

export { getPodcastPeriodicity };
