export default function scores(state={}, action) {
  switch (action.type) {
    case 'SCORES_INIT':
      const scores = {};
      action.playerIDs.forEach(id => {
        scores[id] = 0;
      });
      return scores;

    default:
      return state;
  }
}
