import { Genre, PodcastLoadFilter } from 'common/types/types';

const getCurrentValues = (currentState: PodcastLoadFilter, genres: Genre[]): Record<string, boolean> =>
  genres.reduce<Record<string, boolean>>((acc, genre) => {
    return {
      ...acc,
      [genre.key]: currentState.genres.includes(genre.id),
    };
  }, {});

export { getCurrentValues };
