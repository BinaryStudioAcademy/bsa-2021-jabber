import { useLocation } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import Counter from 'components/counter/counter';
import SignIn from 'components/sign-in/sign-in';
import SignUp from 'components/sign-up/sign-up';
import { Toaster } from 'components/common/common';
import { Link, Route, Switch } from 'components/common/common';
import logo from 'assets/img/logo.svg';

const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="App">
        <Toaster />
        <div>
          <ul className="App-navigation-list">
            <li>
              <Link to={AppRoute.ROOT}>Root</Link>
            </li>
            <li>
              <Link to={AppRoute.SIGN_IN}>Sign in</Link>
            </li>
            <li>
              <Link to={AppRoute.SIGN_UP}>Sign up</Link>
            </li>
          </ul>
          <p>Current path: {pathname}</p>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route path={AppRoute.ROOT} component={Counter} exact />
            <Route path={AppRoute.SIGN_IN} component={SignIn} exact />
            <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
          </Switch>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="App-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </header>
      </div>
    </>
  );
};

export default App;
