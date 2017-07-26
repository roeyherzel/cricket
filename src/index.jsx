import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

import 'common/styles/reset.css';

function render(Root) {
  ReactDOM.render(
    <AppContainer>
      <Root />
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
