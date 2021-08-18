import { ShownotePayloadKey } from 'common/enums/enums';

type ShownoteCreatePayload = {
  [ShownotePayloadKey.MINUTES]: string | number;
  [ShownotePayloadKey.SECONDS]: string | number;
  [ShownotePayloadKey.NAME]: string;
};

export type { ShownoteCreatePayload };
