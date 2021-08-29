import { Joi } from 'helpers/helpers';
import { getFileFromFileList } from 'helpers/helpers';

const emptyFileListValidation = (image: FileList, helpers: Joi.CustomHelpers<FileList>): FileList | Joi.ErrorReport => {
  const file = getFileFromFileList(image);

  if (!file) {
    return image;
  } else {
    return helpers.error('file.fileListIsNotEmpty');
  }
};

export { emptyFileListValidation };
