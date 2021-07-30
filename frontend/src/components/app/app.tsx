import { AppRoute } from 'common/enums/enums';
import Auth from 'components/auth/auth';
import {
  Switch,
  Route,
  Toaster,
  Header,
  NotFound,
} from 'components/common/common';

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route path={AppRoute.SIGN_UP} exact>
        <Auth screen={AppRoute.SIGN_UP} />
      </Route>
      <Route path={AppRoute.SIGN_IN} exact>
        <Auth screen={AppRoute.SIGN_IN} />
      </Route>
      <Route path={AppRoute.ANY} component={NotFound} />
    </Switch>
    <Toaster />
  </>
);

export default App;
