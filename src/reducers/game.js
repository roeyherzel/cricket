const initialState = {
  gameState: 'new', // one of new/on/over
  winnerID: null,   // winning playerID
  leaderID: null,   // leading playerID
};

export default function game(state = initialState, action) {
  return state;
}
