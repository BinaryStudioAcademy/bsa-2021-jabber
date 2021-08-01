import { RecordCreatePayloadKey } from '~/common/enums/enums';

type RecordCreatePayload = {
  [RecordCreatePayloadKey.FILE_URL]: string;
  [RecordCreatePayloadKey.FILE_SIZE]: number;
  [RecordCreatePayloadKey.EPISODE_ID]: number;
};

export type { RecordCreatePayload };
