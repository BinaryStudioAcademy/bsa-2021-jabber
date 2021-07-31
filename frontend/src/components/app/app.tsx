import { AppRoute } from 'common/enums/enums';
import Auth from 'components/auth/auth';
import {
  Switch,
  Route,
  Toaster,
  Header,
  NotFound,
} from 'components/common/common';
import ConfiguratePodcast from 'components/configurate-podcast/configurate-podcast';

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route
        path={[AppRoute.SIGN_UP, AppRoute.SIGN_IN]}
        component={Auth}
        exact
      />
      <Route
        path={AppRoute.POCAST_EDIT_$ID}
        component={ConfiguratePodcast}
        exact
      />
      <Route path={AppRoute.ANY} component={NotFound} />
    </Switch>
    <Toaster />
  </>
);

export default App;
