import { AppRoute } from 'common/enums/enums';
import Auth from 'components/auth/auth';
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
      <AuthPublicRouter path={AppRoute.ANY} exact component={NotFound} />
    </Switch>
    <Toaster />
  </>
);

export default App;
