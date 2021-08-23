import { Joi } from '~/helpers/helpers';
import {
  PodcastFollowerValidationMessage,
  PodcastFollowerPayloadKey,
} from '~/common/enums/enums';
import { PodcastFollowerPayload } from '~/common/types/types';

const podcastFollower = Joi.object<PodcastFollowerPayload>({
  [PodcastFollowerPayloadKey.PODCAST_ID]: Joi.number().integer().required().messages({
    'number.required': PodcastFollowerValidationMessage.PODCAST_ID_REQUIRE,
    'number.integer': PodcastFollowerValidationMessage.PODCAST_ID_NUMBER_FORMAT,
  }),
  [PodcastFollowerPayloadKey.FOLLOWER_ID]: Joi.number().integer().required().messages({
    'number.required': PodcastFollowerValidationMessage.FOLLOWER_ID_REQUIRE,
    'number.integer': PodcastFollowerValidationMessage.FOLLOWER_ID_NUMBER_FORMAT,
  }),
});

export { podcastFollower };
