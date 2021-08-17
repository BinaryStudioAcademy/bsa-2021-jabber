import { Joi } from 'helpers/helpers';
import { EpisodePayloadKey, FileExtension } from 'common/enums/enums';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';
import { fileExtensionValidation } from './shared/helpers/helpers';
import { EpisodeValidationMessage } from 'jabber-shared/common/enums/enums';

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
