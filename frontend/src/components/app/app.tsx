// import { AppRoute } from 'common/enums/enums';
// import { Switch, Route, Toaster, Header } from 'components/common/common';
// import SignUp from 'components/sign-up/sign-up';
// import SignIn from 'components/sign-in/sign-in';

import { Toaster, Header } from 'components/common/common';
import CreatePodcast from 'components/create-podcast/create-podcast';
const App: React.FC = () => (
  <>
    <Header />
    <CreatePodcast />
    {/* <Switch>
      <Route path={AppRoute.SIGN_IN} component={SignUp} exact />
      <Route path={AppRoute.SIGN_UP} component={SignIn} exact />
    </Switch> */}
    <Toaster />
  </>
);
// eslint-disable-next-line no-console
export default App;
