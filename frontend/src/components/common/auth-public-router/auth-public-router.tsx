import { RouteProps } from 'react-router-dom';
import { Route } from 'components/common/common';
import { AuthWrapper } from 'components/common/common';

type Props = {
  component: React.ElementType;
} & RouteProps;

const AuthPublicRouter: React.FC<Props> = ({ component, ...otherProps }) => {
  const Component: React.ElementType = component;

  const handleRender = (): JSX.Element  => (
    <AuthWrapper>
      <Component />
    </AuthWrapper>
  );

  return <Route {...otherProps} render={handleRender} />;
};

export default AuthPublicRouter;
