import { combineReducers } from 'redux';
import game from './game';
import players from './players';
import scores from './scores';
import targets from './targets';

const rootReducer = combineReducers({
  game,
  players,
  scores,
  targets,
});

export default rootReducer;

