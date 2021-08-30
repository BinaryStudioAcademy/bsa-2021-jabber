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
import { fileExtensionValidation, emptyFileListValidation } from '../../helpers/helpers';

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
  [EpisodePayloadKey.STATUS]: Joi.when(EpisodePayloadKey.RECORD_DATA_URL, {
    is: Joi.string().required(),
    then: Joi.valid(EpisodeStatus.PUBLISHED),
    otherwise: Joi.when(EpisodePayloadKey.RECORD, {
      is: Joi.object()
        .allow(null)
        .custom(emptyFileListValidation, 'empty file list validation'),
      then: Joi.valid(EpisodeStatus.STAGING),
      otherwise: Joi.valid(EpisodeStatus.PUBLISHED),
    }),
  }).messages({
    'any.only': EpisodeValidationMessage.INVALID_EPISOD_STATUS,
  }),
  [EpisodePayloadKey.RECORD_DATA_URL]: Joi.string().allow(null),
});

export { episodeCreate };
