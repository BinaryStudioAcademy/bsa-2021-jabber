import { RouteProps, RouteComponentProps } from 'react-router-dom';
import { Route } from 'components/common/common';
import { AuthWrapper } from 'components/common/common';

type Props = RouteProps & {
  component: React.ComponentType<RouteComponentProps<Record<string, string | undefined>>>;
};

const AuthPublicRouter: React.FC<Props> = ({ ...otherProps }) => {
  const { component: Component } = otherProps;

  return (
    <Route
      {...otherProps}
      component={undefined}
      render={(props): React.ReactNode => (
        <AuthWrapper>
          <Component {...props} />
        </AuthWrapper>
      )}
    />
  );
};

export default AuthPublicRouter;
