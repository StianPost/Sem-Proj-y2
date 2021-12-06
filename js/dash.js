import { BASE_URL, headers } from './configs/configs.js';

import { getAPI } from './libs/apiCalls.js';

async function dashFiller() {
  const dashArray = await getAPI(`${BASE_URL}/products`);
  const dashBody = document.querySelector('.dashBody');
  dashBody.innerHTML = ``;
  dashArray.forEach(({ id, title, price, isFeatured }) => {
    dashBody.innerHTML += `
          <tr class="tableRow">
              <th scope="row">${id}</th>
              <td>${title}</td>
              <td>$${price}</td>
              <td>${isFeatured ? 'Yes' : 'No'}</td>
              <td>
                  <a href="/editProd.html?id=${id}">
                      <i class="fas fa-edit dashEdit dashHover"></i>
                  </a>
              </td>
              <td><i class="far fa-trash-alt dashDelete dashHover" data-id=${id}></i></td>
          </tr>
          `;
  });
  let deleteBtns = document.querySelectorAll('.dashDelete');

  deleteBtns.forEach((element) => {
    element.onclick = async () => {
      let deleteProd = confirm(`are you sure you want to delete this Product?`);
      if (deleteProd) {
        let { data } = await axios.delete(
          `${BASE_URL}/products/${element.dataset.id}`,
          headers
        );
        dashFiller();
      }
    };
  });
}
dashFiller();
