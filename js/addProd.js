import { BASE_URL, headers } from './configs/configs.js';

import alert from './components/alert.js';

const form = document.querySelector('.addForm');

form.onsubmit = async function (event) {
  event.preventDefault();
  const title = document.querySelector('#title');
  const description = document.querySelector('#description');
  const price = document.querySelector('#price');
  const img_url = document.querySelector('#img_url');
  const isFeatured = document.querySelector('#isFeatured');
  const isMale = document.querySelector('#isMale');
  const isFemale = document.querySelector('#isFemale');
  const isUni = document.querySelector('#isUni');
  const isSmart = document.querySelector('#isSmart');

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

  try {
    let newProd = {
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

    let response = await axios.post(`${BASE_URL}/products`, newProd, headers);
    alert('alert-success', 'Article has been created');

    title.value = '';
    description.value = '';
    price.value = '';
    img_url.value = '';
    isFeatured.checked = false;
    isMale.checked = false;
    isFemale.checked = false;
    isUni.checked = false;
    isSmart.checked = false;
  } catch (error) {
    alert('alert-danger', 'An error occured, article not created');
  }
};
