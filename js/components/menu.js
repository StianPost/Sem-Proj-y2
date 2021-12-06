import { testEmailAddress, testText } from '../libs/validation.js';

import { BASE_URL } from '../configs/configs.js';
import alert from './alert.js';
import { getUser } from '../libs/localStorageHelpers.js';

const location = window.location.pathname;

let menu = `
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link ${
                  location === '/' ? 'active' : ''
                }"href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${
                  location === '/prodList.html' ||
                  location === '/prodDetail.html'
                    ? 'active'
                    : ''
                }" href="/prodList.html">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${
                  location === '/dash.html' ? 'active' : ''
                }" href="/dash.html">Dashboard</a>
              </li>
              <li class="nav-item logBTN">
                <a class="nav-link logbtns loginBtn">Login</a>
              </li>
              <li class="nav-item">
                <a href="/cartpage.html" class="nav-link ${
                  location === '/cartpage.html' ? 'active' : ''
                }">Cart</a>
              </li>
            </ul>
            `;

let modalInfo = `
<div class="modal">
  <div class="modal__overlay">
    <form class="modal__form">
    <h3>Admin Login</h3>
    <div class="close"> CLOSE X </div>
      <div class="mb-3">
        <label for="formEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="formEmail" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="formPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="formPassword">
      </div>
      <button type="submit" class="cta cta--login">Submit</button>
    </form>
  </div>
</div>
`;

(function () {
  if (getUser('user')) {
    document.querySelector('.navContainer').innerHTML = menu;

    const logBtn = document.querySelector('.logBTN');

    logBtn.innerHTML = `<a class="nav-link logbtns logoutBtn">Logout</a>`;

    const logout = document.querySelector('.logoutBtn');
    if (logout) {
      logout.onclick = function () {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        window.location.href = './index.html';
      };
    }
  } else {
    document.querySelector('.navContainer').innerHTML += modalInfo;

    const login = document.querySelector('.loginBtn');
    const modal = document.querySelector('.modal');
    login.onclick = () => {
      console.log('hello');
      modal.style.display = 'block';
    };

    const closeModal = document.querySelector('.close');
    closeModal.onclick = () => {
      modal.style.display = 'none';
    };

    const loginForm = document.querySelector('.modal__form');
    loginForm.onsubmit = async (event) => {
      event.preventDefault();

      const password = document.querySelector('#formPassword');
      const email = document.querySelector('#formEmail');

      if (testText(password.value, 3) && testEmailAddress(email.value)) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/local`, {
            identifier: email.value,
            password: password.value,
          });
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = './dash.html';
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('wops');
      }
    };
  }
})();
