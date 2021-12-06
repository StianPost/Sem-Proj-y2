import { BASE_URL } from './configs/configs.js';
import { cardHtml } from './components/cardHtml.js';
import { getAPI } from './libs/apiCalls.js';

const featuredArray = await getAPI(`${BASE_URL}/products`);
const heroArray = await getAPI(`${BASE_URL}/herobanners`);

let count = 0;
const shuffledArray = featuredArray.sort((a, b) => 0.5 - Math.random());

for (let i = 0; i < shuffledArray.length; i++) {
  if (shuffledArray[i].isFeatured) {
    count++;
    document.querySelector('.featuredRow').innerHTML += cardHtml(
      shuffledArray[i].title,
      shuffledArray[i].img_url,
      shuffledArray[i].price,
      shuffledArray[i].id,
      12,
      4,
      4
    );
  }
  if (count === 3) {
    break;
  }
}

document.querySelector(
  '.heroCard__img'
).style.backgroundImage = `url("${heroArray[0].img_url}")`;
