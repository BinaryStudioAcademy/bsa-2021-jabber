import { ImageCreatePayloadKey } from '~/common/enums/enums';

type ImageCreatePayload = {
  [ImageCreatePayloadKey.URL]: string;
  [ImageCreatePayloadKey.PUBLIC_ID]: string;
};

export type { ImageCreatePayload };
