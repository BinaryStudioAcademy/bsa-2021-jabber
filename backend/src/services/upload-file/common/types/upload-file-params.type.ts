import { ResourceType } from '~/common/enums/enums';

type UploadFileProps = {
  dataUrl: string;
  userId: number;
  resourceType?: ResourceType;
};

export type { UploadFileProps };
