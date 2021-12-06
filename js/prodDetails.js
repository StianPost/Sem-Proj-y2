const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

import {
  getFromLocalStorage,
  saveToLocalStorage,
  shoppingStorage,
} from './libs/localStorageHelpers.js';

import { BASE_URL } from './configs/configs.js';
import { cardHtml } from './components/cardHtml.js';
import { getAPI } from './libs/apiCalls.js';

const { title, img_url, price, isFeatured, description } = await getAPI(
  `${BASE_URL}/products/${id}`
);
const shoppingArray = getFromLocalStorage('shopCart');
console.log(shoppingArray);

document.querySelector('.prod__info').innerHTML = `
  <div class="prod__header">
      <h1>${title}</h1>
  </div>
  <div class="prod__details">
      <p class="prod__designer">-Postal Design</p>
  </div>
  <div class="prod__text">
      <p>${description}</p>
      <p class="prod__price">$${price}</p>
  </div>
  <button class="cta cta--buy"
      id="buyClockBtn" 
      data-id="${id}" data-title="${title}" 
      data-img_url="${img_url}" data-price="${price}">Add
  </button>
`;

document.querySelector('.prod__imgContainer').innerHTML = `
<img class="prod__img" src="${img_url}" alt="Picture of ${title} the one of the most amazing clock"/>
`;

const array = await getAPI(`${BASE_URL}/products`);
const shuffledArray = array.sort((a, b) => 0.5 - Math.random());

let count = 0;
for (let i = 0; i < shuffledArray.length; i++) {
  if (shuffledArray[i].title !== title) {
    count++;
    document.querySelector('.rndmProds').innerHTML += cardHtml(
      shuffledArray[i].title,
      shuffledArray[i].img_url,
      shuffledArray[i].price,
      shuffledArray[i].id,
      12,
      3,
      6,
      3
    );
  }
  if (count === 4) {
    break;
  }
}

shoppingStorage('#buyClockBtn');
