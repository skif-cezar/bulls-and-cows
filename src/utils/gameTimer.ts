/**
 * Start timer with callback every sec
 */
export const startGameTimer = (onTick: () => void): (() => void) => {
  const intervalId = window.setInterval(onTick, 1000);

  return () => window.clearInterval(intervalId);
};
