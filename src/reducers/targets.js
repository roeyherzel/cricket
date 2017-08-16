export default function targets(state=[], action) {
  switch (action.type) {
    case 'TARGETS_INIT':
      return action.targetIDs.map(id => ({
        id,
        players: action.playerIDs.map(playerID => ({
          playerID,
          hitCount: 0,
        })),
      }));

    default:
      return state;
  }
}
