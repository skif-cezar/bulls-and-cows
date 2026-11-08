import { WinBannerComponent } from '../../../types/ui.types';

export const createWinBanner = (): WinBannerComponent => {
  const sectionBanner = document.createElement('section');
  sectionBanner.classList.add('game-banner');
  sectionBanner.hidden = true;
  sectionBanner.setAttribute('aria-live', 'polite');

  const bannerTitle = document.createElement('h2');
  bannerTitle.classList.add('banner-title');
  bannerTitle.textContent = 'Win!';

  const bannerText = document.createElement('p');
  bannerText.classList.add('banner-text');

  const secretNumber = document.createElement('code');
  secretNumber.classList.add('banner-code');

  const result = document.createElement('span');
  result.classList.add('banner-result');

  bannerText.append('The secret number ', secretNumber, ' was guessed in ', result);
  sectionBanner.append(bannerTitle, bannerText);

  const showWin = (secret: string, attemptsCount: number, timeInSeconds: number): void => {
    const gameForm = document.getElementById('guess-form');

    if (gameForm) {
      gameForm.style.display = 'none';
      gameForm.hidden = true;
    }
    secretNumber.textContent = secret;
    const attemptWord = attemptsCount === 1 ? 'attempt' : 'attempts';
    result.textContent = `${attemptsCount} ${attemptWord} ( ${timeInSeconds} sec )`;

    sectionBanner.hidden = false;
    sectionBanner.removeAttribute('aria-live');
    sectionBanner.classList.add('win-banner');
  };

  return {
    element: sectionBanner,
    showWin,
  };
};
