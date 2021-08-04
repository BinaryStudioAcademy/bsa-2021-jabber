import { ShowNotesCreatePayloadKey } from '~/common/enums/enums';

type ShowNotesCreatePayload = {
  [ShowNotesCreatePayloadKey.NAME]: string;
  [ShowNotesCreatePayloadKey.EPISODE_ID]: number;
  [ShowNotesCreatePayloadKey.TIMESTAMP]: number;
};

export type { ShowNotesCreatePayload };
