import { ShownotePayloadKey } from '~/common/enums/enums';

type ShownotePayload = {
  [ShownotePayloadKey.NAME]: string;
  [ShownotePayloadKey.TIMESTAMP]: number;
};

export type { ShownotePayload };
