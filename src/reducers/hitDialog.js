// Hit dialog state
// Cache desired target -> player to hit
export default function hitDialog(state={open: false}, action) {
  switch (action.type) {
    case 'HIT_DIALOG_OPEN':
      return {
        open: true,
        targetID: action.targetID,
        playerID: action.playerID,
      };

    case 'HIT_DIALOG_CLOSE':
      return {
        open: false,
      };

    default:
      return state;
  }
}
