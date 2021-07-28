import { Header } from 'components/common/common';
import { Toaster } from 'components/common/common';

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Toaster />
        <Header />
      </div>
    </>
  );
};

export default App;
