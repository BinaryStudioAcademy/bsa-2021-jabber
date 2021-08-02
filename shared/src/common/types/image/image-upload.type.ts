import { ImageUploadKey } from '~/common/enums/enums';

type ImageUploadPayload = {
  [ImageUploadKey.DATA_URL]: string;
  [ImageUploadKey.USER_ID]: number;
};

export type { ImageUploadPayload };
