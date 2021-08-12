import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { navigation } from 'services/services';
import { store } from 'store/store';
import App from 'components/app/app';
import './assets/css/styles.scss';

render(
  <StrictMode>
    <Provider store={store}>
      <Router history={navigation.instance}>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
