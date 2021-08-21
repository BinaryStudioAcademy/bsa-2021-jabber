import { Model, Page, QueryBuilder } from 'objection';

class PodcastQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  ArrayQueryBuilderType!: PodcastQueryBuilder<M, M[]>;
  SingleQueryBuilderType!: PodcastQueryBuilder<M, M>;
  NumberQueryBuilderType!: PodcastQueryBuilder<M, number>;
  PageQueryBuilderType!: PodcastQueryBuilder<M, Page<M>>;

  filterBySearch(search: string): this {
    if (!search) {
      return this;
    }

    return this.whereRaw(`REPLACE(name, ' ', '') ILIKE REPLACE('%${search}%', ' ', '')`);
  }

  filterByGenres(genres: number[]): this {
    if (!genres.length) {
      return this;
    }

    return this.whereIn('genre_id', genres);
  }
}

export { PodcastQueryBuilder }
