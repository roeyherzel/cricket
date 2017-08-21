// Players scores state
// Object of playerID -> score
export default function scores(state={}, action) {
  switch (action.type) {

    case 'SCORES_INIT':
      // Reset player's score
      const scores = {};
      action.playerIDs.forEach(id => scores[id] = 0);
      return scores;

    case 'SCORE_CHANGE':
      // Update player's score
      const { playerID, change } = action;
      const score = state[playerID];

      return {
        ...state,
        [playerID]: score + change,
      };

    default:
      return state;
  }
}
