import { Joi } from '~/helpers/helpers';
import { userEdit } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  UserPayloadKey,
  UserValidationMessage,
} from '~/common/enums/enums';

const editUser = userEdit.keys({
  [UserPayloadKey.IMAGE_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': UserValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
  [UserPayloadKey.IMAGE_ID]: Joi.number().allow(null),
});

export { editUser };
