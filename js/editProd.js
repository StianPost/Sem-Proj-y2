import { BASE_URL, headers } from './configs/configs.js';

import alert from './components/alert.js';
import { getAPI } from './libs/apiCalls.js';

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const title = document.querySelector('#title');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const img_url = document.querySelector('#img_url');
const isFeatured = document.querySelector('#isFeatured');
const isMale = document.querySelector('#isMale');
const isFemale = document.querySelector('#isFemale');
const isUni = document.querySelector('#isUni');
const isSmart = document.querySelector('#isSmart');

const form = document.querySelector('.editForm');

const prodArray = await getAPI(`${BASE_URL}/products/${id}`);

title.value = prodArray.title;
description.value = prodArray.description;
price.value = prodArray.price;
img_url.value = prodArray.img_url;
isFeatured.value = prodArray.isFeatured;
isMale.value = prodArray.isMale;
isFemale.value = prodArray.isFemale;
isUni.value = prodArray.isUni;
isSmart.value = prodArray.isSmart;

function isChecked(object) {
  if (object.value === 'true') {
    object.checked = true;
  }
}
isChecked(isFeatured);
isChecked(isMale);
isChecked(isFemale);
isChecked(isUni);
isChecked(isSmart);

form.onsubmit = async function (event) {
  event.preventDefault();
  function isTrue(object) {
    if (object.checked) {
      object.value = true;
    } else {
      object.value = false;
    }
  }
  isTrue(isFeatured);
  isTrue(isMale);
  isTrue(isFemale);
  isTrue(isUni);
  isTrue(isSmart);

  let updatedProduct = {
    title: title.value,
    description: description.value,
    price: price.value,
    img_url: img_url.value,
    isFeatured: isFeatured.value,
    isMale: isMale.value,
    isFemale: isFemale.value,
    isUni: isUni.value,
    isSmart: isSmart.value,
  };
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${id}`,
      updatedProduct,
      headers
    );

    alert('alert-success', 'Edit successful');
  } catch (error) {
    alert('alert-danger', 'Something went wrong');
  }
};
