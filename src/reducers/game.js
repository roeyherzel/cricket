const initialState = {
  status: 'new', // one of new/on/over
  leaderID: null,
};

export default function game(state = initialState, action) {
  switch (action.type) {

    case 'GAME_START':
      return { ...state, status: 'on' };

    case 'GAME_NEW':
      return initialState;

    case 'GAME_LEADER':
      const { leaderID, score } = action;
      const status = (score === 21) ? 'over' : state.status;

      return { ...state, leaderID, status };

    default:
      return state;
  }
}
