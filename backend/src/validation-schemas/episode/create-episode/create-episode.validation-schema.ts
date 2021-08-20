import { Joi } from '~/helpers/helpers';
import {
  EpisodeValidationMessage,
  EpisodePayloadKey,
} from '~/common/enums/enums';
import { common } from '../common/common.validation-schema';

const episodeCreate = common.keys({
  [EpisodePayloadKey.PODCAST_ID]: Joi.number().integer().required().messages({
    'number.required': EpisodeValidationMessage.PODCAST_ID_REQUIRE,
    'number.integer': EpisodeValidationMessage.PODCAST_ID_NUMBER_FORMAT,
  }),
});

export { episodeCreate };
