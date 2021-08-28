import { getTimestamp, Joi } from 'helpers/helpers';
import {
  EpisodePayloadKey,
  FileExtension,
  EpisodeValidationMessage,
  ShownotePayloadKey,
  EpisodeStatus,
} from 'common/enums/enums';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';
import { shownoteCreate } from 'validation-schemas/shownote/create-shownote/create-shownote.validation-schema';
import { fileExtensionValidation } from '../../helpers/helpers';

const episodeStatus = Object.values(EpisodeStatus).filter(
  (status) => status != EpisodeStatus.LIVE,
);

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
      fileExtensionValidation(FileExtension.MP3, FileExtension.WAV),
      'file extension validation',
    )
    .allow(null)
    .messages({
      'file.invalidExtension': EpisodeValidationMessage.DATA_URL_FORMAT,
    }),
  [EpisodePayloadKey.SHOWNOTES]: Joi.array()
    .items(shownoteCreate)
    .unique(
      (a, b) =>
        getTimestamp(
          a[ShownotePayloadKey.MINUTES],
          a[ShownotePayloadKey.SECONDS],
        ) ===
        getTimestamp(
          b[ShownotePayloadKey.MINUTES],
          b[ShownotePayloadKey.SECONDS],
        ),
    )
    .messages({
      'array.required': EpisodeValidationMessage.SHOWNOTES_REQUIRE,
      'array.unique': EpisodeValidationMessage.SHOWNOTE_DUPLICATE,
    }),
  [EpisodePayloadKey.STATUS]: Joi.string()
    .valid(...episodeStatus)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.STATUS_REQUIRE,
    }),
});

export { episodeCreate };
