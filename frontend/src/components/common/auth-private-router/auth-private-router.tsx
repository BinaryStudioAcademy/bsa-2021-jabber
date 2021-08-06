import { RouteProps } from 'react-router-dom';
import { AuthWrapper, PrivateRoute } from 'components/common/common';

type Props = {
  component: React.ElementType;
} & RouteProps;

const AuthPrivateRouter: React.FC<Props> = ({ component, ...otherProps }) => {
  const Component: React.ElementType = component;

  const handleRender = (): JSX.Element => (
    <AuthWrapper>
      <Component />
    </AuthWrapper>
  );

  return <PrivateRoute {...otherProps} render={handleRender} />;
};
export default AuthPrivateRouter;
