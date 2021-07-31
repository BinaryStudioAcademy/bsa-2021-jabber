import { ResourceType } from '~/common/enums/enums';

type UploadFileProps = {
  file: Express.Multer.File;
  userId: number;
  resourceType: ResourceType;
};

export type { UploadFileProps };
