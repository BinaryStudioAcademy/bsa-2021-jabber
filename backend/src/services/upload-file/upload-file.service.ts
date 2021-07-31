import cloudinary from 'cloudinary';
import DatauriParser from 'datauri/parser';
import { UploadFileResponse } from '~/common/types/types';
import { ENV, ResourceType } from '~/common/enums/enums';

interface UploadFileProps {
  file: Express.Multer.File;
  userId: number;
}

class UploadFile {
  constructor() {
    cloudinary.v2.config({
      CLOUDINARY_URL: ENV.UPLOAD.API_URL,
    });
  }

  public async uploadFile({ file, userId }: UploadFileProps): Promise<UploadFileResponse> {
    const parser = new DatauriParser();
    const dataUri = parser.format(file.originalname, file.buffer);
    const content = <string>dataUri.content;
    const { url, bytes } = await cloudinary.v2.uploader.upload_large(content, {
      folder: String(userId),
      resource_type: ResourceType.auto,
    });

    return {
      url,
      bytes,
    };
  }
}
export { UploadFile };
