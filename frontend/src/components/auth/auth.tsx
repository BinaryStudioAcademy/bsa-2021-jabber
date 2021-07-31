import { AppRoute } from 'common/enums/enums';
import { auth as authActions } from 'store/actions';
import { UserCreatePayload } from 'common/types/types';
import { SignInForm, SignUpForm } from './components/components';
import { useDispatch, useLocation } from 'hooks/hooks';
import logo from 'assets/img/logo-dark.svg';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleSignUpSubmit = (payload: UserCreatePayload): void => {
    dispatch(authActions.signUp(payload));
  };

  const handleSignInSubmit = (): void => {
    // handleSignInSubmit
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
