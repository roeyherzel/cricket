const initialState = {
  status: 'new', // one of new/on/over
  winnerID: null,   // winning playerID
  leaderID: null,   // leading playerID
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'GAME_START':
      return { status: 'on' };

    default:
      return state;
  }
}
