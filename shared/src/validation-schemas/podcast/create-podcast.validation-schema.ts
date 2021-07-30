import * as Joi from 'joi';
import { PodcastCreatePayloadKey } from '~/common/enums/enums';
import { PodcastCreatePayload } from '~/common/types/types';

const createPodcastSchema = Joi.object<PodcastCreatePayload>({
  [PodcastCreatePayloadKey.NAME]: Joi.string().min(1).max(20).required(),
  [PodcastCreatePayloadKey.USER_ID]: Joi.number().integer().positive(),
});

export { createPodcastSchema };
