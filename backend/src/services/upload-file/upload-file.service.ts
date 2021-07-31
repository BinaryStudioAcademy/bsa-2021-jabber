import cloudinary from 'cloudinary';
import DatauriParser from 'datauri/parser';
import { UploadFileResponse } from '~/common/types/types';
import { ENV } from '~/common/enums/enums';

class UploadFile {
  constructor() {
    cloudinary.v2.config({
      CLOUDINARY_URL: ENV.UPLOAD.API_URL,
    });
  }

  public async uploadFile(file: Express.Multer.File, userId: number): Promise<UploadFileResponse> {
    const parser = new DatauriParser();
    const dataUri = parser.format(file.originalname, file.buffer);
    const content = dataUri.content as string;
    const { url, bytes } = await cloudinary.v2.uploader.upload_large(content, {
      folder: String(userId),
      resource_type: 'auto',
    });

    return {
      url,
      bytes,
    };
  }
}
export { UploadFile };
