import { Joi } from '~/helpers/helpers';
import {
  EpisodeValidationRule,
  EpisodeValidationMessage,
  EpisodeCreatePayloadKey,
  EpisodeType,
  ShownoteCreatePayloadKey,
} from '~/common/enums/enums';
import { EpisodeCreatePayload } from '~/common/types/types';
import { shownote as shownoteValidationSchema } from '../shownote/shownote';

const episodeTypes = Object.values(EpisodeType);

const episode = Joi.object<EpisodeCreatePayload>({
  [EpisodeCreatePayloadKey.NAME]: Joi.string()
    .trim()
    .min(EpisodeValidationRule.EPISODE_NAME_MIN_LENGTH)
    .max(EpisodeValidationRule.EPISODE_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.EPISODE_NAME_REQUIRE,
      'string.min': EpisodeValidationMessage.EPISODE_NAME_MIN_LENGTH,
      'string.max': EpisodeValidationMessage.EPISODE_NAME_MAX_LENGTH,
    }),
  [EpisodeCreatePayloadKey.USER_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': EpisodeValidationMessage.USER_ID_REQUIRE,
      'number.integer': EpisodeValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
  [EpisodeCreatePayloadKey.PODCAST_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': EpisodeValidationMessage.PODCAST_ID_REQUIRE,
      'number.integer': EpisodeValidationMessage.PODCAST_ID_NUMBER_FORMAT,
    }),
  [EpisodeCreatePayloadKey.TYPE]: Joi.string()
    .valid(...episodeTypes)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.TYPE_REQUIRE,
    }),
  [EpisodeCreatePayloadKey.SHOWNOTES]: Joi.array()
    .items(shownoteValidationSchema)
    .unique(
      (a, b) =>
        a[ShownoteCreatePayloadKey.TIMESTAMP] ===
        b[ShownoteCreatePayloadKey.TIMESTAMP],
    )
    .required()
    .messages({
      'array.required': EpisodeValidationMessage.SHOWNOTES_REQUIRE,
      'array.unique': EpisodeValidationMessage.SHOWNOTE_DUPLICATE,
    }),
  [EpisodeCreatePayloadKey.DESCRIPTION]: Joi.string()
    .trim()
    .min(EpisodeValidationRule.EPISODE_DESCRIPTION_MIN_LENGTH)
    .max(EpisodeValidationRule.EPISODE_DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.EPISODE_DESCRIPTION_REQUIRE,
      'string.min': EpisodeValidationMessage.EPISODE_DESCRIPTION_MIN_LENGTH,
      'string.max': EpisodeValidationMessage.EPISODE_DESCRIPTION_MAX_LENGTH,
    }),
});

export { episode };
