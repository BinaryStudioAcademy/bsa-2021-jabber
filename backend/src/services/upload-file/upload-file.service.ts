import cloudinary from 'cloudinary';
import { UploadFileResponse } from '~/common/types/types';
import { ENV, ResourceType } from '~/common/enums/enums';
import { UploadFileProps } from './common/types/types';

const { config, uploader } = cloudinary.v2;
const { upload_large: uploadLarge } = uploader;

class UploadFile {
  constructor() {
    config({
      CLOUDINARY_URL: ENV.UPLOAD.API_URL,
    });
  }

  public async upload({
    dataUrl,
    userId,
    resourceType = ResourceType.AUTO,
  }: UploadFileProps): Promise<UploadFileResponse> {
    const { url, bytes, public_id } = await uploadLarge(dataUrl, {
      folder: String(userId),
      resource_type: resourceType,
    });

    return {
      url,
      public_id,
      bytes,
    };
  }
}
export { UploadFile };
