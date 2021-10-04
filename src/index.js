import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

// default theme handlers
import { ThemeProvider } from '@material-ui/core';
import theme from './Theme/theme';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('react-root'),
);
