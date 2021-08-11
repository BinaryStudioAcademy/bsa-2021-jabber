import { Joi } from 'helpers/helpers';
import { FileExtension } from 'common/enums/enums';
import { getFileFromFileList } from 'helpers/helpers';

const fileExtensionValidation = (...fileExtensions: FileExtension[]) =>
  (image: FileList, helpers: Joi.CustomHelpers<FileList>): FileList | Joi.ErrorReport => {
    const file = getFileFromFileList(image);

    if (!file) {
      return image;
    }

    const fileExtension = file.name.split('.').pop();
    const isFileExtensionValid = fileExtensions.some(
      (validExtension) => validExtension === fileExtension,
    );

    if (!isFileExtensionValid) {
      return helpers.error('file.invalidExtension');
    }

    return image;
  };

export { fileExtensionValidation };
