import { AppRoute, StorageKey } from 'common/enums/enums';
import {
  Switch,
  Route,
  Toaster,
  NotFound,
  AuthPublicRouter,
  Loader,
  AuthPrivateRouter,
} from 'components/common/common';
import Auth from 'components/auth/auth';
import Homepage from 'components/homepage/homepage';
import ConfiguratePodcast from 'components/configurate-podcast/configurate-podcast';
import ConfigurateEpisode from 'components/configurate-episode/configurate-episode';
import UserProfile from 'components/user-profile/user-profile';
import Episode from 'components/episode/episode';
import Podcast from 'components/podcast/podcast';
import Notifications from 'components/notifications/notifications';
import EpisodeLive from 'components/episode-live/episode-live';
import EditUser from 'components/edit-user/edit-user';
import PodcastInvite from 'components/podcast-invite/podcast-invite';
import { useDispatch, useEffect, useAppSelector } from 'hooks/hooks';
import { storage } from 'services/services';
import { auth as authActions, notification as notificationAction } from 'store/actions';
import UserFollowersPage from 'components/user-followers/user-followers';
import ConfiguratePlaylist from 'components/configurate-playlist/configurate-playlist';
import Playlist from 'components/user-playlists/user-playlists';

const App: React.FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const dispatch = useDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));
  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.getCurrentUser());
    }
  }, []);

  useEffect(() => {
    dispatch(notificationAction.getCountUncheckedUserNotifications());
  }, []);

  if (!hasUser && hasToken) {
    return <Loader />;
  }

  return (
    <>
      <Switch>
        <Route
          path={[AppRoute.SIGN_UP, AppRoute.SIGN_IN, AppRoute.RESET_PASSWORD]}
          component={Auth}
          exact
        />
        <AuthPrivateRouter
          path={AppRoute.PODCASTS_EDIT_$ID}
          component={ConfiguratePodcast}
          exact
        />
        <AuthPrivateRouter
          path={AppRoute.NOTIFICATIONS}
          component={Notifications}
          exact
        />
        <AuthPrivateRouter
          path={AppRoute.PODCASTS_INVITE_$CODE}
          component={PodcastInvite}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.PODCASTS_$ID}
          component={Podcast}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.PODCASTS_$ID_EPISODES_EDIT_$ID}
          component={ConfigurateEpisode}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.USERS_$ID}
          component={UserProfile}
          exact
        />
        <AuthPrivateRouter
          path={AppRoute.USERS_EDIT_$ID}
          component={EditUser}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.EPISODES_$ID}
          component={Episode}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.EPISODES_$ID_LIVE}
          component={EpisodeLive}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.USERS_$ID_FOLLOWERS}
          component={UserFollowersPage}
          exact
        />
        <AuthPrivateRouter
          path={AppRoute.PLAYLISTS_USERS_$ID}
          component={Playlist}
          exact
        />
        <AuthPrivateRouter
          path={AppRoute.PLAYLISTS_EDIT_$ID}
          component={ConfiguratePlaylist}
          exact
        />
        <AuthPublicRouter path={AppRoute.ROOT} component={Homepage} exact />
        <AuthPublicRouter path={AppRoute.ANY} component={NotFound} exact />
      </Switch>
      <Toaster />
    </>
  );
};

export default App;
