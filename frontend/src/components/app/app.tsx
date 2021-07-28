import { Toaster } from 'components/common/common';
import SignUp from 'components/sign-up/sign-up';

const App: React.FC = () => {
  return (
    <div className="App">
      <SignUp />
      <Toaster />
    </div>
  );
};

export default App;
