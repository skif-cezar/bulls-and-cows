let timerInterval: number | null = null;

/**
 * Clear current game timer
 */
export const clearGameTimer = (): void => {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

/**
 * Start timer with callback every sec
 */
export const startGameTimer = (onTick: (currentTime: number) => void): void => {
  clearGameTimer(); // На всякий случай сбрасываем предыдущий

  let currentTime = 0;

  timerInterval = window.setInterval(() => {
    currentTime += 1;
    onTick(currentTime);
  }, 1000);
};
