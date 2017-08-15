/*
 * Player Actions
 * --------------
 */

let nextPlayerID = 0;

export const addPlayer = name => {
  return {
    type: 'PLAYER_ADD',
    id: nextPlayerID++,
    name,
  };
};

export const editPlayer = (id, name) => {
  return {
    type: 'PLAYER_EDIT',
    id,
    name,
  };
};

export const deletePlayer = id => {
  return {
    type: 'PLAYER_DELETE',
    id,
  };
};

/*
 * Game Actions
 * ------------
 */

export const startGame = () => {
  return {
    type: 'GAME_START',
  };
};
