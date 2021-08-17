import { Joi } from 'helpers/helpers';
import { podcast } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  PodcastPayloadKey,
  PodcastValidationMessage,
  FileExtension,
} from 'common/enums/enums';
import { fileExtensionValidation } from 'helpers/helpers';

const podcastCreate = podcast.keys({
  [PodcastPayloadKey.IMAGE]: Joi.object()
    .custom(
      fileExtensionValidation(
        FileExtension.JPEG,
        FileExtension.JPG,
        FileExtension.PNG,
        FileExtension.SVG,
      ),
      'file extension validation',
    )
    .allow(null)
    .messages({
      'file.invalidExtension': PodcastValidationMessage.FILE_EXTENSION_FORMAT,
    }),
  [PodcastPayloadKey.COVER]: Joi.object()
    .custom(
      fileExtensionValidation(
        FileExtension.JPEG,
        FileExtension.JPG,
        FileExtension.PNG,
        FileExtension.SVG,
      ),
      'file extension validation',
    )
    .allow(null)
    .messages({
      'file.invalidExtension': PodcastValidationMessage.FILE_EXTENSION_FORMAT,
    }),
  [PodcastPayloadKey.GENRE]: Joi.string().allow(null),
});

export { podcastCreate };
