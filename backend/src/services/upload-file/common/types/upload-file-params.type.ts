import { ResourceType } from '~/common/enums/enums';

type UploadFileProps = {
  base64: string;
  userId: number;
  resourceType: ResourceType;
};

export type { UploadFileProps };
