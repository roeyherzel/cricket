import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';

import 'common/styles/reset.css';

function render(Root) {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Root />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
