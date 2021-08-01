import * as Joi from 'joi';
import {
  AddEpisodeValidationRule,
  AddEpisodeValidationMessage,
  EpisodeCreatePayloadKey,
} from '~/common/enums/enums';
import { EpisodeCreatePayload } from '~/common/types/types';

const addEpisode = Joi.object<EpisodeCreatePayload>({
  [EpisodeCreatePayloadKey.NAME]: Joi.string()
    .min(AddEpisodeValidationRule.NAME_MIN_LENGTH)
    .max(AddEpisodeValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': AddEpisodeValidationMessage.NAME_REQUIRE,
      'string.min': AddEpisodeValidationMessage.NAME_MIN_LENGTH,
      'string.max': AddEpisodeValidationMessage.NAME_MAX_LENGTH,
    }),
});

export { addEpisode };
