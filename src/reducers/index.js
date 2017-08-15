import { combineReducers } from 'redux';
import game from './game';
import players from './players';

const rootReducer = combineReducers({
  game,
  players,
});

export default rootReducer;

