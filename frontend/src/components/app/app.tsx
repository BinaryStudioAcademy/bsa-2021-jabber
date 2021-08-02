import { AppRoute } from 'common/enums/enums';
import {
  Switch,
  Route,
  Toaster,
  NotFound,
  AuthPrivateRouter,
  AuthPublicRouter,
} from 'components/common/common';
import Auth from 'components/auth/auth';
import Homepage from 'components/homepage/homepage';
import ConfiguratePodcast from 'components/configurate-podcast/configurate-podcast';
import Episode from 'components/episode/episode';

const App: React.FC = () => (
  <>
    <Switch>
      <Route
        path={[AppRoute.SIGN_UP, AppRoute.SIGN_IN]}
        component={Auth}
        exact
      />
      <AuthPrivateRouter
        path={AppRoute.PODCAST_EDIT_$ID}
        component={ConfiguratePodcast}
        exact
      />
      <AuthPublicRouter
        path={AppRoute.PODCAST_$ID_EPISODE_$ID}
        component={Episode}
        exact
      />
      <AuthPublicRouter path={AppRoute.ROOT} component={Homepage} exact />
      <AuthPublicRouter path={AppRoute.ANY} component={NotFound} exact />
    </Switch>
    <Toaster />
  </>
);

export default App;
