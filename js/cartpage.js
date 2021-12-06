import {
  getFromLocalStorage,
  shoppingStorage,
} from './libs/localStorageHelpers.js';

import { cartHTML } from './components/cardHtml.js';

const storageArray = getFromLocalStorage('shopCart');

cartHTML(storageArray, '.cart', '.total__price');

shoppingStorage('.cta--remove');

document.querySelector('.cta--clear').onclick = () => {
  localStorage.removeItem('shopCart');
  const clearedArray = getFromLocalStorage('shopCart');
  cartHTML(clearedArray, '.cart', '.total__price');
};
