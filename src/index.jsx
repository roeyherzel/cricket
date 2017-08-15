import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import reducer from './reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = createStore(reducer);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function render(Root) {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
}

render(App);


if (module.hot) {
  module.hot.accept('./', () => {
    render(App);
  });
}
