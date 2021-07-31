import cloudinary, { UploadApiOptions } from 'cloudinary';
import DatauriParser from 'datauri/parser';
import { ENV } from '~/common/enums/enums';

interface UploadFileResponse {
  url: string;
  bytes: number;
}

class UploadFile {
  constructor() {
    cloudinary.v2.config({
      CLOUDINARY_URL: ENV.CLOUDINARY.URL,
    });
  }

  public async uploadFile(file: Express.Multer.File, userId: number): Promise<UploadFileResponse> {
    const parser = new DatauriParser();
    const dataUri = parser.format(file.originalname, file.buffer);
    const content = dataUri.content as string;
    const options: UploadApiOptions = {
      folder: String(userId),
      resource_type: 'auto',
    };
    const { url, bytes } = await cloudinary.v2.uploader.upload_large(content, options);

    return {
      url,
      bytes,
    };
  }
}
export { UploadFile };
