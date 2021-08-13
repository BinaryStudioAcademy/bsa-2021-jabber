import { Genre, Option } from 'common/types/types';

const mapGenreToSelectOptions = (genres: Genre): Option => ({
  value: genres.id.toString(),
  label: genres.name,
});

export { mapGenreToSelectOptions };
