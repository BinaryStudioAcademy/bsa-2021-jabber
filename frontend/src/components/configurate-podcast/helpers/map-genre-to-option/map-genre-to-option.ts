import { Genre, Option } from 'common/types/types';

const mapGenreToOptions = (genres: Genre[]): Option[] => {
  return genres.map((genre) => {
    return {
      value: genre.id.toString(),
      label: genre.name,
    };
  });
};

export { mapGenreToOptions };
