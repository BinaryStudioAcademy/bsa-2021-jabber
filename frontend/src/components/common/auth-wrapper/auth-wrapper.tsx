import { Header } from 'components/common/common';

const AuthWrapper: React.FC = ({ children }) => <>
  <Header/>
  {children}
</>;

export default AuthWrapper;
