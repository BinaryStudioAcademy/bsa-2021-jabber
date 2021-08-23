import { Genre, GenresFilter } from 'common/types/types';
const getSelectedGenres = ({ genresFilter }: GenresFilter, genres: Genre[]): number[] =>
  genres.reduce<number[]>((acc, genre) => {
    const hasGenre = Boolean(genresFilter[genre.key]);
    return hasGenre ? acc.concat(genre.id) : acc;
  }, []);

export { getSelectedGenres };
