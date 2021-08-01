import { AppRoute } from 'common/enums/enums';
import Auth from 'components/auth/auth';
import Episode from 'components/episode/episode';
import {
  Switch,
  Route,
  Toaster,
  NotFound,
  AuthPublicRouter,
} from 'components/common/common';

const App: React.FC = () => (
  <>
    <Switch>
      <Route
        path={[AppRoute.SIGN_UP, AppRoute.SIGN_IN]}
        component={Auth}
        exact
      />
      <Route exact path="/episode/:id" component={Episode} />
      <AuthPublicRouter path={AppRoute.ANY} component={NotFound} exact />
    </Switch>
    <Toaster />
  </>
);

export default App;
