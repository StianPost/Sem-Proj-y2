import { BASE_URL } from './configs/configs.js';
import { cardHtml } from './components/cardHtml.js';
import { filteringAnArray } from './libs/filterArray.js';
import { getAPI } from './libs/apiCalls.js';

const prodList = document.querySelector('.prodList');
const prodArray = await getAPI(`${BASE_URL}/products`);

function prodFillerArray(array, domELM) {
  array.forEach(({ title, img_url, isFeatured, price, id }) => {
    domELM.innerHTML += cardHtml(title, img_url, price, id, 12, 4, 6, 3);
  });
}
prodFillerArray(prodArray, prodList);

const searchBar = document.querySelector('.searchInput');

searchBar.onkeyup = () => {
  prodList.innerHTML = ``;

  let searchResults = filteringAnArray(prodArray, searchBar.value);
  if (searchResults.length === 0) {
    document.querySelector('.error').innerHTML = '<p>Sorry no matches</p>';
  } else {
    document.querySelector('.error').innerHTML = '';
  }
  if (searchBar.value.trim() === '') {
    prodFillerArray(prodArray, prodList);
    return;
  }
  prodFillerArray(searchResults, prodList);
};
