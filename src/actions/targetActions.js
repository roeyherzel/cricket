const targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];

export const initTargets = playerIDs => ({
  type: 'TARGETS_INIT',
  targetIDs,
  playerIDs,
});
