import { AppRoute } from 'common/enums/enums';
import Auth from 'components/auth/auth';
import {
  Switch,
  Route,
  Toaster,
  Header,
  NotFound,
} from 'components/common/common';
import CreatePodcast from 'components/create-podcast/create-podcast';

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route
        path={[AppRoute.SIGN_UP, AppRoute.SIGN_IN]}
        component={Auth}
        exact
      />
      <Route path={AppRoute.EDIT_PODCAST} component={CreatePodcast} exact />
      <Route path={AppRoute.ANY} component={NotFound} />
    </Switch>
    <Toaster />
  </>
);

export default App;
