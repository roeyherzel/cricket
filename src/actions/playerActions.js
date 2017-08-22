// Helpers
// -------
let nextPlayerID = 0;
const buildPlayer = name => ({
  id: nextPlayerID++,
  name,
});

// Validations
// -----------
const validateMaxPlayer = playersCount => {
  const maxPlayers = 4;
  return (playersCount === maxPlayers) ?
    { status: false, error: `Cannot add player - max players ${maxPlayers}` }
    :
    { status: true };
};

const validatePlayerName = (name, otherNames) => {
  let status = false;

  // Check that name is a string grater than 0
  if (typeof name !== 'string' || name.length < 1) {
    return { status, error: `Invalid player name ${name}` };
  }
  // Check if name already exists
  if (otherNames.find(n => n.toLowerCase() == name.toLowerCase())) {
    return { status, error: `Player name '${name}' already exists` };
  }
  // Pass validation
  return { status: true };
};


// Action Creators
// ---------------
export const loadDemoPlayers = () => ({
  type: 'DEMO_PLAYERS',
  players: ['Joey', 'Johnny', 'Dee Dee', 'Tommy'].map(name => buildPlayer(name)),
});

export function addPlayer(name) {
  return function(dispatch, getState) {
    const { players } = getState();
    let validation;
    validation = validateMaxPlayer(players.length);
    if (!validation.status) return validation.error;

    validation = validatePlayerName(name, players.map(p => p.name));
    if (!validation.status) return validation.error;

    dispatch({
      type: 'PLAYER_ADD',
      ...buildPlayer(name),
    });
  };
}

export function editPlayer(id, name) {
  return function(dispatch, getState) {
    // Filterout edit player and prepare list of players names
    const otherNames = getState().players.filter(p => p.id !== id).map(p => p.name);
    const { status, error } = validatePlayerName(name, otherNames);
    if (!status) return error;

    dispatch({
      type: 'PLAYER_EDIT',
      id,
      name,
    });
  };
}

export const deletePlayer = id => ({
  type: 'PLAYER_DELETE',
  id,
});
