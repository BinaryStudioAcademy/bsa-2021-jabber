import { Joi } from 'helpers/helpers';
import { FileExtension } from 'common/enums/enums';
import { getFileFromFileList } from 'helpers/helpers';

const fileExtensionValidation: Joi.CustomValidator<FileList> = (
  image,
  helpers,
) => {
  const file = getFileFromFileList(image);

  if (!file) {
    return image;
  }

  const fileExtension = file.name.split('.').pop();
  const isFileExtensionValid = [
    FileExtension.JPEG,
    FileExtension.JPG,
    FileExtension.SVG,
    FileExtension.PNG,
  ].some((validExtension) => validExtension === fileExtension);

  if (!isFileExtensionValid) {
    return helpers.error('file.invalidExtension');
  }

  return image;
};

export { fileExtensionValidation };
