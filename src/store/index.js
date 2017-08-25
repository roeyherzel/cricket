import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';

const loggerMiddleware = createLogger();

const middlewares = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware, // neat middleware that logs actions
);

// FIXME: compose devtools breaks safari and firefox
const store = createStore(
  rootReducer,
  middlewares
  // compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
