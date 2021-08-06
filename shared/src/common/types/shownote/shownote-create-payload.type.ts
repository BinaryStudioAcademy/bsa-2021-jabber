import { ShownoteCreatePayloadKey } from '~/common/enums/enums';

type ShownoteCreatePayload = {
  [ShownoteCreatePayloadKey.NAME]: string;
  [ShownoteCreatePayloadKey.EPISODE_ID]: number;
  [ShownoteCreatePayloadKey.TIMESTAMP]: number;
};

export type { ShownoteCreatePayload };
