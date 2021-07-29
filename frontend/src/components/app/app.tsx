import { Toaster, Header } from 'components/common/common';
import SignUp from 'components/sign-up/sign-up';

const App: React.FC = () => (
  <>
    <Header />
    <SignUp />
    <Toaster />
  </>
);

export default App;
