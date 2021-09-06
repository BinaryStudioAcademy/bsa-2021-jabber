import { Joi } from '~/helpers/helpers';
import { playlistCreate } from '../playlist';
import {
  PlaylistPayloadKey,
} from '~/common/enums/enums';

const playlistEdit = playlistCreate.keys({
  [PlaylistPayloadKey.COVER_ID]: Joi.number().integer().allow(null),
});

export { playlistEdit };
