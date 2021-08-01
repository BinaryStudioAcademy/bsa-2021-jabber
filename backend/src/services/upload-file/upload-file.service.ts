import cloudinary from 'cloudinary';
import { UploadFileResponse } from '~/common/types/types';
import { ENV } from '~/common/enums/enums';
import { UploadFileProps } from './common/types/types';

class UploadFile {
  constructor() {
    cloudinary.v2.config({
      CLOUDINARY_URL: ENV.UPLOAD.API_URL,
    });
  }

  public async uploadFile({
    base64,
    userId,
    resourceType,
  }: UploadFileProps): Promise<UploadFileResponse> {
    const { url, bytes } = await cloudinary.v2.uploader.upload_large(base64, {
      folder: String(userId),
      resource_type: resourceType,
    });

    return {
      url,
      bytes,
    };
  }
}
export { UploadFile };
