const initialState = {
  status: 'new', // one of new/on/over
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'GAME_START':
      return { ...state, status: 'on' };

    default:
      return state;
  }
}
