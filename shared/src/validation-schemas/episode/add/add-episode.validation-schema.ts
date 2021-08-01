import * as Joi from 'joi';
import {
  AddEpisodeValidationRule,
  AddEpisodeValidationMessage,
  EpisodeCreatePayloadKey,
} from '~/common/enums/enums';
import { EpisodeCreatePayload } from '~/common/types/types';

const addEpisode = Joi.object<EpisodeCreatePayload>({
  [EpisodeCreatePayloadKey.NAME]: Joi.string()
    .min(AddEpisodeValidationRule.EPISODE_NAME_MIN_LENGTH)
    .max(AddEpisodeValidationRule.EPISODE_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': AddEpisodeValidationMessage.EPISODE_NAME_REQUIRE,
      'string.min': AddEpisodeValidationMessage.EPISODE_NAME_MIN_LENGTH,
      'string.max': AddEpisodeValidationMessage.EPISODE_NAME_MAX_LENGTH,
    }),
  [EpisodeCreatePayloadKey.USER_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': AddEpisodeValidationMessage.USER_ID_REQUIRE,
      'number.integer': AddEpisodeValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
  [EpisodeCreatePayloadKey.PODCAST_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': AddEpisodeValidationMessage.PODCAST_ID_REQUIRE,
      'number.integer': AddEpisodeValidationMessage.PODCAST_ID_NUMBER_FORMAT,
    }),
});

export { addEpisode };
