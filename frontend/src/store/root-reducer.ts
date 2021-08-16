import { reducer as auth } from './auth/reducer';
import { reducer as configuratePodcast } from './configurate-podcast/reducer';
import { reducer as configurateEpisode } from './configurate-episode/reducer';
import { reducer as homepage } from './homepage/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as episode } from './episode/reducer';
import { reducer as podcast } from './podcast/reducer';
import { reducer as record } from './record/reducer';
import { reducer as userProfile } from './user-profile/reducer';
import { reducer as notification } from './notification/reducer';
import { reducer as configurateUser } from './configurate-user/reducer';
import { reducer as player } from './player/reducer';

const rootReducer = {
  auth,
  configuratePodcast,
  configurateEpisode,
  homepage,
  episode,
  podcast,
  record,
  userProfile,
  notification,
  configurateUser,
  toastr: toastrReducer,
  player,
};

export { rootReducer };
