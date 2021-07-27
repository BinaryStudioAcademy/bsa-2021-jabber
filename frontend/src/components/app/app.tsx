import React from 'react';
import { AppRoute } from 'common/enums/enums';
import SignIn from 'components/sign-in/sign-in';
import SignUp from 'components/sign-up/sign-up';
import { Link, Route, Switch } from 'components/common/common';

const App: React.FC = () => {

  return (
    <>
      <div className="App">
        <div>
          <ul className="App-navigation-list">
            <li>
              <Link to={AppRoute.SIGN_IN}>Sign in</Link>
            </li>
            <li>
              <Link to={AppRoute.SIGN_UP}>Sign up</Link>
            </li>
          </ul>
        </div>
        <header className="App-header">
          <Switch>
            <Route path={AppRoute.SIGN_IN} component={SignIn} exact />
            <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
          </Switch>
        </header>
      </div>
    </>
  );
};

export default App;
