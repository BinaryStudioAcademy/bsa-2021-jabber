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
import HomePage from 'components/homepage/homepage';
import ConfiguratePodcast from 'components/configurate-podcast/configurate-podcast';

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
      <AuthPublicRouter path={AppRoute.ROOT} component={HomePage} exact />
      <AuthPublicRouter path={AppRoute.ANY} component={NotFound} exact />
    </Switch>
    <Toaster />
  </>
);

export default App;
