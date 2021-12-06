export const cardHtml = (title, image, price, id, small, large, med, xl) => {
  let cardHTML = `
      <div class="col-sm-${small} col-md-${med} col-lg-${large} col-lg-${xl}">
      <a href="/prodDetail.html?id=${id}">
        <div class="featureCard">
          <img class="featureCard__img" src="${image}" alt="image of ${title} the fantastic clock for all your needs"/>
          <div class="featureCard__header">
            <div class="featureCard__top">
              <h3>${title}</h3>
              <p>${price}$</p>
            </div>
            <p class="featureCard__name">-Postal Design</p>
          </div>
          <div class="featureCard__btn"></div>
        </div>
      </a>
    </div>`;
  return cardHTML;
};

export const cartHTML = (array, domELM, priceELM) => {
  let totalPrice = 0;
  if (array.length === 0) {
    console.log('asdhklalkdsahkldasd');
    document.querySelector(domELM).innerHTML = `<p>NO ITEMS</p>`;
  } else {
    document.querySelector(domELM).innerHTML = ``;
    array.forEach(({ id, title, price, img_url }) => {
      document.querySelector(domELM).innerHTML += `
            <div class="cartItem">
              <div class="cartItem__imgContainer">
                <img src="${img_url}" class="cartItem__img cart__img${id}" alt="One of the best clocks in the world ${title}" />
              </div>
              <div class="cartItem__info">
                  <h2>${title}</h2>
                  <p class="cartItem__price">$${price}</p>
              </div>
              <div class="cartItem__btn">
                <button class="cta cta--remove" data-id="${id}" data-title="${title}" 
                data-img_url="${img_url}" data-price="${price}">Remove</button>
            </div>
            `;

      totalPrice += parseInt(price);
    });
  }

  document.querySelector(priceELM).innerHTML = `
  <p class="total__price--price">$${totalPrice}</p>
`;
};
