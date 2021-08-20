import { ShownotePayloadKey } from '~/common/enums/enums';

type ShownoteCommonPayload = {
  [ShownotePayloadKey.NAME]: string;
};

export type { ShownoteCommonPayload };
