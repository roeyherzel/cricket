export default function players(state = [], action) {
  switch (action.type) {
    case 'DEMO_PLAYERS':
      return action.players;

    case 'PLAYER_ADD':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
        },
      ];

    case 'PLAYER_DELETE':
      return state.filter(player => player.id !== action.id);

    case 'PLAYER_EDIT':
      return state.map(player =>
      (player.id === action.id) ?
        { ...player, name: action.name } :
        player
    );

    default:
      return state;
  }
}
