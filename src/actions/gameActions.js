const initScores = playerIDs => ({
  type: 'SCORES_INIT',
  playerIDs,
});

export const incScore = playerID => ({
  type: 'SCORE_INC',
  playerID,
});

const targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];

const initTargets = playerIDs => ({
  type: 'TARGETS_INIT',
  targetIDs,
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
