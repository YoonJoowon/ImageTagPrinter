export function tagHTML(keyword, [R, G, B]) {
  return `<article style="background-color: rgba(${R}, ${G}, ${B}, 0.7);" class="tag" data-keyword="${keyword}">#${keyword}</article>`;
}

export function getRandomRGB(min, max) {
  const arrRGB = [];
  arrRGB.push(randomRGB(min, max));
  arrRGB.push(randomRGB(min, max));
  arrRGB.push(randomRGB(min, max));
  return arrRGB;
}

export function randomRGB(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}
