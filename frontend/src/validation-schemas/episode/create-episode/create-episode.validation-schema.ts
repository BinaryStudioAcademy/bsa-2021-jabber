import { Joi } from 'helpers/helpers';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  EpisodePayloadKey,
  FileExtension,
  EpisodeValidationMessage,
} from 'common/enums/enums';
import { fileExtensionValidation } from '../../helpers/helpers';

const episodeCreate = episode.keys({
  [EpisodePayloadKey.IMAGE]: Joi.object()
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
      'file.invalidExtension': EpisodeValidationMessage.DATA_URL_FORMAT_IMG,
    }),
  [EpisodePayloadKey.RECORD]: Joi.object()
    .custom(
      fileExtensionValidation(
        FileExtension.MP3,
        FileExtension.WAV,
      ),
      'file extension validation',
    )
    .allow(null)
    .messages({
      'file.invalidExtension': EpisodeValidationMessage.DATA_URL_FORMAT,
    }),
});

export { episodeCreate };
