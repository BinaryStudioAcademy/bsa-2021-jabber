import { Joi } from '~/helpers/helpers';
import {
  EpisodeValidationMessage,
  EpisodePayloadKey,
  EpisodeStatus,
} from '~/common/enums/enums';
import { common } from '../common/common.validation-schema';

const episodeCreate = common.keys({
  [EpisodePayloadKey.PODCAST_ID]: Joi.number().integer().required().messages({
    'number.required': EpisodeValidationMessage.PODCAST_ID_REQUIRE,
    'number.integer': EpisodeValidationMessage.PODCAST_ID_NUMBER_FORMAT,
  }),
  [EpisodePayloadKey.STATUS]: Joi.when(EpisodePayloadKey.RECORD_DATA_URL, {
    is: Joi.string().required(),
    then: Joi.valid(EpisodeStatus.PUBLISHED),
    otherwise: Joi.valid(EpisodeStatus.STAGING),
  }).messages({
    'any.only': EpisodeValidationMessage.INVALID_EPISOD_STATUS,
  }),
});

export { episodeCreate };
