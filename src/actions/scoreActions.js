export const initScores = playerIDs => ({
  type: 'SCORES_INIT',
  playerIDs,
});

export const incScore = playerID => ({
  type: 'SCORE_INC',
  playerID,
});
