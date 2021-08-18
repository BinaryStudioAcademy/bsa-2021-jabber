import { Joi } from '~/helpers/helpers';
import { shownoteCreate } from '~/validation-schemas/shownote/shownote';
import {
  EpisodeValidationRule,
  EpisodeValidationMessage,
  EpisodePayloadKey,
  EpisodeType,
  EpisodeStatus,
  ShownotePayloadKey,
} from '~/common/enums/enums';

const episodeTypes = Object.values(EpisodeType);
const episodeStatus = Object.values(EpisodeStatus);

const episode = Joi.object({
  [EpisodePayloadKey.NAME]: Joi.string()
    .trim()
    .min(EpisodeValidationRule.EPISODE_NAME_MIN_LENGTH)
    .max(EpisodeValidationRule.EPISODE_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.EPISODE_NAME_REQUIRE,
      'string.min': EpisodeValidationMessage.EPISODE_NAME_MIN_LENGTH,
      'string.max': EpisodeValidationMessage.EPISODE_NAME_MAX_LENGTH,
    }),
  [EpisodePayloadKey.TYPE]: Joi.string()
    .valid(...episodeTypes)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.TYPE_REQUIRE,
    }),
  [EpisodePayloadKey.DESCRIPTION]: Joi.string()
    .trim()
    .min(EpisodeValidationRule.EPISODE_DESCRIPTION_MIN_LENGTH)
    .max(EpisodeValidationRule.EPISODE_DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.EPISODE_DESCRIPTION_REQUIRE,
      'string.min': EpisodeValidationMessage.EPISODE_DESCRIPTION_MIN_LENGTH,
      'string.max': EpisodeValidationMessage.EPISODE_DESCRIPTION_MAX_LENGTH,
    }),
  [EpisodePayloadKey.SHOWNOTES]: Joi.array()
    .items(shownoteCreate)
    .unique(
      (a, b) =>
        a[ShownotePayloadKey.TIMESTAMP] === b[ShownotePayloadKey.TIMESTAMP],
    )
    .required()
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

export { episode };
