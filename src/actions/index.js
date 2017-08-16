/*
 * Player Actions
 * --------------
 */

let nextPlayerID = 0;

export const addPlayer = name => ({
  type: 'PLAYER_ADD',
  id: nextPlayerID++,
  name,
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

export const loadDemoPlayers = () => ({
  type: 'DEMO_PLAYERS',
  players: ['Joey', 'Johnny', 'Dee Dee', 'Tommy'].map(name => addPlayer(name)),
});

/*
 * Game Actions
 * ------------
 */

export const startGame = () => ({
  type: 'GAME_START',
});
