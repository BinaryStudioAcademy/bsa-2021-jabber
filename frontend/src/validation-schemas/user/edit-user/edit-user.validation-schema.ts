
import { Joi, fileExtensionValidation } from 'helpers/helpers';
import { userEdit } from 'jabber-shared/validation-schemas/validation-schemas';
import { PodcastPayloadKey, FileExtension, UserValidationMessage } from 'common/enums/enums';

const editUser = userEdit.keys({
  [PodcastPayloadKey.IMAGE]: Joi.object()
    .custom(
      fileExtensionValidation(
        FileExtension.JPEG,
        FileExtension.JPG,
        FileExtension.PNG,
        FileExtension.SVG,
      ),
      'file extension validation',
    )
    .allow(null)
    .messages({
      'file.invalidExtension': UserValidationMessage.FILE_EXTENSION_FORMAT,
    }),
});

export { editUser };
