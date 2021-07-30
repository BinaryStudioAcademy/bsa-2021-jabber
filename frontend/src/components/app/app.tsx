import { AppRoute } from 'common/enums/enums';
import {
  Switch,
  Route,
  Toaster,
  Header,
  NotFound,
} from 'components/common/common';
import SignUp from 'components/sign-up/sign-up';
import SignIn from 'components/sign-in/sign-in';
import CreatePodcast from 'components/create-podcast/create-podcast';

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route path={AppRoute.SIGN_IN} component={SignIn} exact />
      <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
      <Route path={AppRoute.CREATE_PODCAST} component={CreatePodcast} exact />
      <Route path={AppRoute.ANY} component={NotFound} />
    </Switch>
    <Toaster />
  </>
);

export default App;
