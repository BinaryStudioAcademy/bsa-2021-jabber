import { ShownotePayloadKey } from '~/common/enums/enums';
import { ShownotePayload } from './shownote-payload.type';

type ShownoteCreatePayload = ShownotePayload & {
  [ShownotePayloadKey.EPISODE_ID]: number;
};

export type { ShownoteCreatePayload };
