import { Joi } from '~/helpers/helpers';
import {
  UserFollowerValidationMessage,
  UserFollowerPayloadKey,
} from '~/common/enums/enums';
import { UserFollowerPayload } from '~/common/types/types';

const userFollower = Joi.object<UserFollowerPayload>({
  [UserFollowerPayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': UserFollowerValidationMessage.USER_ID_REQUIRE,
    'number.integer': UserFollowerValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
  [UserFollowerPayloadKey.FOLLOWER_ID]: Joi.number().integer().required().messages({
    'number.required': UserFollowerValidationMessage.FOLLOWER_ID_REQUIRE,
    'number.integer': UserFollowerValidationMessage.FOLLOWER_ID_NUMBER_FORMAT,
  }),
});

export { userFollower };
