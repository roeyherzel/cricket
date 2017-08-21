// Players targets state.
// List of TargetID objects with nested list of players targets
export default function targets(state=[], action) {
  switch (action.type) {

    case 'TARGETS_INIT':
      // Reset target's hit count
      return action.targetIDs.map(id => ({
        id,
        players: action.playerIDs.map(playerID => ({
          id: playerID,
          hitCount: 0,
        })),
      }));

    case 'TARGET_CHANGE':
      // Update target's hit count
      const newState = [...state];
      const { targetID, playerID, change } = action;
      const { players } = newState.find(t => t.id === targetID);
      const player = players.find(p => p.id === playerID);

      player.hitCount += change;
      return newState;

    default:
      return state;
  }
}
