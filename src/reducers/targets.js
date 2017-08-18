export default function targets(state=[], action) {
  switch (action.type) {
    case 'TARGETS_INIT':
      return action.targetIDs.map(id => ({
        id,
        players: action.playerIDs.map(playerID => ({
          id: playerID,
          hitCount: 0,
        })),
      }));

    case 'TARGET_HIT':
      const newState = [...state];
      const target = newState.find(t => t.id === action.targetID);
      const player = target.players.find(p => p.id === action.playerID);
      player.hitCount += action.oper;
      return newState;

    default:
      return state;
  }
}
