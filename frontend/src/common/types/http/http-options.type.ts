import { ContentType, HttpMethod } from 'common/enums/enums';

type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
  hasAuth: boolean;
  query: Record<string, unknown>;
};

export type { HttpOptions };
