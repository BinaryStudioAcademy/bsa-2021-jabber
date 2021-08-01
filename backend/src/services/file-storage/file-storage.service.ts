import cloudinary from 'cloudinary';
import { UploadFileResponse } from '~/common/types/types';
import { ResourceType } from '~/common/enums/enums';
import { UploadFileProps } from './common/types/types';

type Constructor = {
  storageApiUser: string;
};

const { config, uploader } = cloudinary.v2;
const { upload_large: uploadLarge } = uploader;

class FileStorage {
  constructor({ storageApiUser }: Constructor) {
    config({
      CLOUDINARY_URL: storageApiUser,
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
      bytes,
      publicId: public_id,
    };
  }
}
export { FileStorage };
