import { AppRoute } from 'common/enums/enums';
import Auth from 'components/auth/auth';
import {
  Switch,
  Route,
  Toaster,
  NotFound,
  AuthPrivateRouter,
  AuthPublicRouter,
} from 'components/common/common';
import ConfiguratePodcast from 'components/configurate-podcast/configurate-podcast';
import Episode from 'components/create-episode/episode';

const App: React.FC = () => (
  <>
    <Switch>
      <Route
        path={[AppRoute.SIGN_UP, AppRoute.SIGN_IN]}
        component={Auth}
        exact
      />
      <AuthPrivateRouter
        path={AppRoute.POCAST_EDIT_$ID}
        component={ConfiguratePodcast}
        exact
      />
      <AuthPublicRouter path={AppRoute.EPISODE_CREATE_$ID} component={Episode} exact />
      <AuthPublicRouter path={AppRoute.ANY} component={NotFound} exact />
    </Switch>
    <Toaster />
  </>
);

export default App;
