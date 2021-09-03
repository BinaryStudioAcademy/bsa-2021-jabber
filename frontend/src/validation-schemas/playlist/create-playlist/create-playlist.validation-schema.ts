import { Joi, fileExtensionValidation } from 'helpers/helpers';
import { playlist } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  PlaylistPayloadKey,
  PlaylistValidationMessage,
  FileExtension,
} from 'common/enums/enums';

const playlistCreate = playlist.keys({
  [PlaylistPayloadKey.COVER]: Joi.object()
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
      'file.invalidExtension': PlaylistValidationMessage.FILE_EXTENSION_FORMAT,
    }),
});

export { playlistCreate };
