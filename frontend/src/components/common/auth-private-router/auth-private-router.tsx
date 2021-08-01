import { RouteProps, RouteComponentProps } from 'react-router-dom';
import { AuthWrapper, PrivateRoute } from 'components/common/common';

type Props = RouteProps & {
  component: React.ComponentType<RouteComponentProps<Record<string, string | undefined>>>;
};

const AuthPrivateRouter: React.FC<Props> = ({ ...otherProps }) => {
  const { component: Component } = otherProps;

  return (
    <PrivateRoute
      {...otherProps}
      render={(props): React.ReactNode => (
        <AuthWrapper>
          <Component {...props} />
        </AuthWrapper>
      )}
    />
  );
};

export default AuthPrivateRouter;
