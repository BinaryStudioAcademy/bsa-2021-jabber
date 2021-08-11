import { Joi } from 'helpers/helpers';
import { podcast } from 'jabber-shared/validation-schemas/validation-schemas';
import { PodcastPayloadKey, FileExtension, PodcastValidationMessage } from 'common/enums/enums';
import { getFileFromFileList, getFileExtension } from 'helpers/helpers';

const fileExtensionValidation: Joi.CustomValidator<FileList> = (image, helpers) => {
  const file = getFileFromFileList(image);

  if (!file) {
    return image;
  }

  const fileExtension = getFileExtension(file);
  const isFileExtensionValid = Object.values(FileExtension).some(
    (validExtension) => validExtension === fileExtension,
  );

  if (!isFileExtensionValid) {
    return helpers.error('file.invalidExtension');
  }

  return image;
};

const podcastCreate = podcast.keys({
  [PodcastPayloadKey.IMAGE]: Joi.object()
    .custom(fileExtensionValidation, 'file extension validation')
    .allow(null)
    .messages({
      'file.invalidExtension': PodcastValidationMessage.FILE_EXTENSION_FORMAT,
    }),
});

export { podcastCreate };
