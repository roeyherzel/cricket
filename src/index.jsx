import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
