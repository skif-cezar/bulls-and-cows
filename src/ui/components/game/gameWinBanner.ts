export const createWinBanner = (): HTMLElement => {
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
  secretNumber.textContent = '7324';

  const result = document.createElement('span');
  result.textContent = '2 attempt ( 10 sec )';
  result.classList.add('banner-result');

  bannerText.append('The secret number ', secretNumber, ' was guessed in ', result);

  sectionBanner.append(bannerTitle, bannerText);

  return sectionBanner;
};
