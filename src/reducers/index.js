import { combineReducers } from 'redux';
import game from './game';
import players from './players';
import scores from './scores';
import targets from './targets';
import hitDialog from './hitDialog';

const rootReducer = combineReducers({
  game,
  players,
  scores,
  targets,
  hitDialog,
});

export default rootReducer;

