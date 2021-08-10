import { Joi } from '~/helpers/helpers';
import { shownote } from '~/validation-schemas/shownote/shownote';
import { EpisodeValidationMessage } from '~/common/enums/validation/validation';
import { EpisodePayloadKey, ShownotePayloadKey } from '~/common/enums/enums';
import { episode } from './episode';

const episodeCreate = episode.keys({
  [EpisodePayloadKey.SHOWNOTES]: Joi.array()
    .items(shownote)
    .unique(
      (a, b) =>
        a[ShownotePayloadKey.TIMESTAMP] === b[ShownotePayloadKey.TIMESTAMP],
    )
    .required()
    .messages({
      'array.required': EpisodeValidationMessage.SHOWNOTES_REQUIRE,
      'array.unique': EpisodeValidationMessage.SHOWNOTE_DUPLICATE,
    }),
});

export { episodeCreate };
