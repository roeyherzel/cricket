export default function hitDialog(state={open: false}, action) {
  switch (action.type) {
    case 'HIT_OPEN':
      return {
        open: true,
        targetID: action.targetID,
        playerID: action.playerID,
      };

    case 'HIT_CLOSE':
      return {
        open: false,
      };

    default:
      return state;
  }
}
