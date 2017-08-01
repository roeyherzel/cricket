/*
  Utility Function
  ----------------
*/
export const findPlayerIndex = (playerId, players) => {
  const index = players.findIndex(p => p.id === playerId);
  if (index === -1) {
    throw new Error(`didn\'t find playerId (${playerId})`);
  }
  return index;
};


export const validatePlayerName = (name, allnames, maxPlayers = 4) => {
  let errorMsg = undefined;

  // Validate player's name
  if (name === '' || name === 0 || !name) {
    errorMsg = 'Invalid player name';
    return errorMsg;
  }
  // Validate max players
  if (allnames.length === maxPlayers) {
    errorMsg = 'Reached max players';
    return errorMsg;
  }
  // Check if name already exists
  if (allnames.length > 0) {
    const found = allnames.find(x => (x.toLowerCase() === name.toLowerCase()));
    if (found !== undefined) {
      errorMsg = 'Player name already exists';
      return errorMsg;
    }
  }
  return errorMsg;
};
