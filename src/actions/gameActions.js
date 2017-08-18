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
    const state = getState();
    const target = state.targets.find(t => t.id === targetID);
    const player = target.players.find(p => p.id === playerID);

    // on add, exit if target is closed
    if (oper === 'INC' && player.hitCount >= 3) {
      console.log('Target is closed');
      return;
    }
    // on remove, exit if target is empty
    if (oper === 'DEC' && player.hitCount === 0) {
      console.log('Target is empty');
      return;
    }

    // Pass vlidations, update target and score
    dispatch({
      type: 'TARGET_HIT',
      oper: (oper === 'INC') ? 1 : -1,
      targetID,
      playerID,
    });
  };
}

export const addHit = (targetID, playerID) => hit(targetID, playerID, 'INC');
export const removeHit = (targetID, playerID) => hit(targetID, playerID, 'DEC');
