import { SearchPayloadKey } from 'components/homepage/components/search/common/enums/search';

type SearchPayload = {
  [SearchPayloadKey.SEARCH]: string,
};

export type { SearchPayload };
