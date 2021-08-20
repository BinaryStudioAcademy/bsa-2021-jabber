import { ShownotePayloadKey } from '~/common/enums/enums';
import { ShownoteCommonPayload } from './shownote-common-payload.type';

type ShownotePayload = ShownoteCommonPayload & {
  [ShownotePayloadKey.TIMESTAMP]: number;
};

export type { ShownotePayload };
