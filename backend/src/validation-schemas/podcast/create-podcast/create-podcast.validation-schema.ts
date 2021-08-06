import { Joi } from '~/helpers/helpers';
import { podcast } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  PodcastPayloadKey,
  PodcastValidationMessage,
  PodcastType,
} from '~/common/enums/enums';

const podcastCreate = podcast.keys({
  [PodcastPayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': PodcastValidationMessage.USER_ID_REQUIRE,
    'number.integer': PodcastValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
  [PodcastPayloadKey.IMAGE_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': PodcastValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
  [PodcastPayloadKey.TYPE]: Joi.string().valid(...Object.values(PodcastType)),
});

export { podcastCreate };
