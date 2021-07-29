import { AppRoute } from 'common/enums/enums';
import { Switch, Route, Toaster, Header } from 'components/common/common';
import SignUp from 'components/sign-up/sign-up';
import SignIn from 'components/sign-in/sign-in';

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route path={AppRoute.SIGN_IN} component={SignUp} exact />
      <Route path={AppRoute.SIGN_UP} component={SignIn} exact />
    </Switch>
    <Toaster />
  </>
);

export default App;
