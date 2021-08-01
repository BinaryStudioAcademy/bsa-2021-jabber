import { AppRoute } from 'common/enums/enums';
import { auth as authActions } from 'store/actions';
import { UserCreatePayload, UserSignInPayload } from 'common/types/types';
import { useAppSelector, useDispatch, useLocation } from 'hooks/hooks';
import { Redirect } from 'components/common/common';
import logo from 'assets/img/logo-dark.svg';
import { SignInForm, SignUpForm } from './components/components';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const hasUser = Boolean(user);

  const handleSignUpSubmit = (payload: UserCreatePayload): void => {
    dispatch(authActions.signUp(payload));
  };

  const handleSignInSubmit = (payload: UserSignInPayload): void => {
    dispatch(authActions.signIn(payload));
  };

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
    }

    return null;
  };

  if (hasUser) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.formWrapper}>
        <img
          src={logo}
          className={styles.formLogo}
          width="140"
          height="50"
          loading="lazy"
          alt="Jabber logo"
        />
        {getScreen(pathname)}
      </div>
    </div>
  );
};

export default Auth;
