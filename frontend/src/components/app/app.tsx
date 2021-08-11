import { AppRoute } from 'common/enums/enums';
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
import PodcastLive from 'components/podcast-live/podcast-live';
import Notifications from 'components/notifications/notifications';
import { useDispatch, useEffect, useAppSelector } from 'hooks/hooks';
import { storage } from 'services/services';
import { auth as authActions } from 'store/actions';
import { StorageKey } from 'common/enums/enums';

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

  if (!hasUser && hasToken) {
    return <Loader />;
  }

  return (
    <>
      <Switch>
        <Route
          path={[AppRoute.SIGN_UP, AppRoute.SIGN_IN]}
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
        <AuthPublicRouter
          path={AppRoute.PODCASTS_$ID}
          component={Podcast}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.PODCASTS_$ID_LIVE}
          component={PodcastLive}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.PODCASTS_$ID_EPISODES_EDIT_$ID}
          component={ConfigurateEpisode}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.USERS_ID}
          component={UserProfile}
          exact
        />
        <AuthPublicRouter
          path={AppRoute.EPISODES_$ID}
          component={Episode}
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
