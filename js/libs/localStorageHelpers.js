import { cartHTML } from '../components/cardHtml.js';

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  if (localStorage.getItem(key) !== null) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return [];
  }
};

export const getUser = (userKey) => {
  return JSON.parse(localStorage.getItem(userKey));
};

export const shoppingStorage = (domElm) => {
  const shopCart = document.querySelectorAll(domElm);
  shopCart.forEach((element) => {
    element.onclick = () => {
      let localStorageObject = {
        id: element.dataset.id,
        price: element.dataset.price,
        title: element.dataset.title,
        description: element.dataset.description,
        img_url: element.dataset.img_url,
      };
      element.classList.toggle('clicked');

      let shopCart = getFromLocalStorage('shopCart');

      let isInStorage = shopCart.find(
        (shopObj) => shopObj.id === localStorageObject.id
      );

      if (isInStorage === undefined) {
        shopCart.push(localStorageObject);
        saveToLocalStorage('shopCart', shopCart);
      } else {
        let removedElementArray = shopCart.filter(
          (shopObj) => shopObj.id !== localStorageObject.id
        );
        saveToLocalStorage('shopCart', removedElementArray);
      }
      if (window.location.pathname === '/cartpage.html') {
        const basketArray = getFromLocalStorage('shopCart');
        cartHTML(basketArray, '.cart', '.total__price');
      }
    };
  });
};
