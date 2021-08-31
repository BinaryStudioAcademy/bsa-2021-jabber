import { Joi } from '~/helpers/helpers';
import {
  UserFavouriteEpisodePayloadKey,
  UserFavouriteEpisodeValidationMessage,
} from '~/common/enums/enums';
import { UserFavouriteEpisodePayload } from '~/common/types/types';

const userFavouriteEpisode = Joi.object<UserFavouriteEpisodePayload>({
  [UserFavouriteEpisodePayloadKey.EPISODE_ID]: Joi.number().integer().required().messages({
    'number.required': UserFavouriteEpisodeValidationMessage.EPISODE_ID_REQUIRE,
    'number.integer': UserFavouriteEpisodeValidationMessage.EPISODE_ID_REQUIRE,
  }),
  [UserFavouriteEpisodePayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': UserFavouriteEpisodeValidationMessage.USER_ID_REQUIRE,
    'number.integer': UserFavouriteEpisodeValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
});

export { userFavouriteEpisode };
