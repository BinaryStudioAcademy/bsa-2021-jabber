import { Joi } from '~/helpers/helpers';
import { playlistCreate } from '../playlist';
import {
  PlaylistPayloadKey,
  PlaylistStatus,
} from '~/common/enums/enums';

const playlistStatus = Object.values(PlaylistStatus);

const playlistEdit = playlistCreate.keys({
  [PlaylistPayloadKey.COVER_ID]: Joi.number().integer().allow(null),
  [PlaylistPayloadKey.STATUS]: Joi.string().valid(...playlistStatus),
});

export { playlistEdit };
