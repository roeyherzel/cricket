// Initialize players scores
const initScores = playerIDs => ({
  type: 'SCORES_INIT',
  playerIDs,
});

// Initialize targets hit count
const initTargets = playerIDs => ({
  type: 'TARGETS_INIT',
  targetIDs: ['20', '19', '18', '17', '16', '15', 'B'],
  playerIDs,
});

// Aggregates players and targets initialization
export function startGame() {
  return function (dispatch, getState) {
    const state = getState();
    const playerIDs = state.players.map(p => p.id);
    dispatch(initScores(playerIDs));
    dispatch(initTargets(playerIDs));
    dispatch({ type: 'GAME_START' });
  };
}

// New game
export const newGame = () => ({ type: 'GAME_NEW' });

// Open hit dialog
export const openHitDialog = (targetID, playerID) => ({
  type: 'HIT_DIALOG_OPEN',
  targetID,
  playerID,
});

// Close hit dialog and set leading player
export function closeHitDialog() {

  return function(dispatch, getState) {
    // Get updated scores state and set leading player
    const { scores } = getState();
    const leaderID = Object.keys(scores).reduce((prev, curr) => {
      return parseInt(scores[prev] > scores[curr] ? prev : curr);
    }, 0);

    dispatch({ type: 'HIT_DIALOG_CLOSE' });
    dispatch({
      type: 'GAME_LEADER',
      leaderID,
      score: scores[leaderID],
    });
  };
}

// Aggregates target / score changes driven by target hit count change
function hit(targetID, playerID, oper) {

  return function(dispatch, getState) {
    const { targets }  = getState();
    const { players }  = targets.find(t => t.id === targetID);
    const { hitCount } = players.find(p => p.id === playerID);

    // on add, exit if target is closed
    if (oper === 'INC' && hitCount >= 3) {
      console.log('Target is closed');
      return;
    }
    // on remove, exit if target is empty
    if (oper === 'DEC' && hitCount === 0) {
      console.log('Target is empty');
      return;
    }

    // Pass validations, update target and score
    const change = (oper === 'INC') ? 1 : -1;

    dispatch({
      type: 'TARGET_CHANGE',
      change,
      targetID,
      playerID,
    });

    dispatch({
      type: 'SCORE_CHANGE',
      change,
      playerID,
    });

  };
}

// Interface for add/remove hit count
export const addHit = (targetID, playerID) => hit(targetID, playerID, 'INC');
export const removeHit = (targetID, playerID) => hit(targetID, playerID, 'DEC');
