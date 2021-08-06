import { SearchPayloadKey } from '~/common/enums/enums';

type SearchPayload = {
  [SearchPayloadKey.SEARCH]: string
}

export type { SearchPayload };
