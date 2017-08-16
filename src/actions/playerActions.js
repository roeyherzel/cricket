let nextPlayerID = 0;
const buildPlayer = name => ({
  id: nextPlayerID++,
  name,
});

export const loadDemoPlayers = () => ({
  type: 'DEMO_PLAYERS',
  players: ['Joey', 'Johnny', 'Dee Dee', 'Tommy'].map(name => buildPlayer(name)),
});

export const addPlayer = name => ({
  type: 'PLAYER_ADD',
  ...buildPlayer(name),
});

export const editPlayer = (id, name) => ({
  type: 'PLAYER_EDIT',
  id,
  name,
});

export const deletePlayer = id => ({
  type: 'PLAYER_DELETE',
  id,
});
