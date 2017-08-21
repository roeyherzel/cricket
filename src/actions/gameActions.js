const initScores = playerIDs => ({
  type: 'SCORES_INIT',
  playerIDs,
});

const initTargets = playerIDs => ({
  type: 'TARGETS_INIT',
  targetIDs: ['20', '19', '18', '17', '16', '15', 'B'],
  playerIDs,
});

export function startGame() {
  const action = {
    type: 'GAME_START',
  };

  return function (dispatch, getState) {
    const state = getState();
    const playerIDs = state.players.map(p => p.id);
    dispatch(initScores(playerIDs));
    dispatch(initTargets(playerIDs));
    dispatch(action);
  };
}

export const openHitDialog = (targetID, playerID) => ({
  type: 'HIT_OPEN',
  targetID,
  playerID,
});

export const closeHitDialog = () => ({
  type: 'HIT_CLOSE',
});

function hit(targetID, playerID, oper) {

  return function(dispatch, getState) {
    let { targets, scores } = getState();
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

    // Get updated scores state and set leading player
    scores = getState().scores;
    const leaderID = Object.keys(scores).reduce((prev, curr) => {
      return scores[prev] > scores[curr] ? prev : curr;
    }, 0);

    dispatch({
      type: 'GAME_LEADER',
      leaderID,
      score: scores[leaderID],
    });

  };
}

export const addHit = (targetID, playerID) => hit(targetID, playerID, 'INC');
export const removeHit = (targetID, playerID) => hit(targetID, playerID, 'DEC');
