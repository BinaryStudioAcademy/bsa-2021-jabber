import { AppRoute } from 'common/enums/enums';
import { auth as authActions } from 'store/actions';
import { UserCreatePayload } from 'common/types/types';
import SignInForm from 'components/sign-in-form/sign-in-form';
import SignUpForm from 'components/sign-up-form/sign-up-form';
import { useDispatch, useLocation } from 'hooks/hooks';

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

  return <>{getScreen(pathname)}</>;
};

export default Auth;
