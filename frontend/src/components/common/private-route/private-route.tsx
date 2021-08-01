import { RouteProps } from 'react-router-dom';
import { Redirect, Route } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';

type Props = RouteProps & {
  redirectTo?: AppRoute;
};

const PrivateRoute: React.FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  ...otherProps
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    <Redirect to={redirectTo} />;
  }

  return <Route {...otherProps} />;
};

export default PrivateRoute;
