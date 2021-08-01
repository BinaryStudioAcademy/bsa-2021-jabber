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
        exact
        component={ConfiguratePodcast}
      />
      <AuthPublicRouter path={AppRoute.ANY} exact component={NotFound} />
    </Switch>
    <Toaster />
  </>
);

export default App;
