import { Model, Page, QueryBuilder as  TQueryBuilder } from 'objection';

class QueryBuilder<M extends Model, R = M[]> extends TQueryBuilder<M, R> {
  ArrayQueryBuilderType!: QueryBuilder<M, M[]>;
  SingleQueryBuilderType!: QueryBuilder<M, M>;
  NumberQueryBuilderType!: QueryBuilder<M, number>;
  PageQueryBuilderType!: QueryBuilder<M, Page<M>>;

  filterBySearch(search: string): this {
    if (!search) {
      return this;
    }

    return this.whereRaw(
      `REPLACE(name, ' ', '') ILIKE REPLACE('%${search}%', ' ', '')`,
    );
  }

  filterByGenres(genres: number[]): this {
    if (!genres.length) {
      return this;
    }

    return this.whereIn('genre_id', genres);
  }
}

export { QueryBuilder };
