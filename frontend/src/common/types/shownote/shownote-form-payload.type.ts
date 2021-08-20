import { ShownotePayloadKey } from 'common/enums/enums';
import { ShownoteCommonPayload } from 'jabber-shared/common/types/types';

type ShownoteFormPayload = ShownoteCommonPayload & {
  [ShownotePayloadKey.MINUTES]: string | number;
  [ShownotePayloadKey.SECONDS]: string | number;
};

export type { ShownoteFormPayload };
