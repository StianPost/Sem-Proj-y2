import { getUser } from './localStorageHelpers.js';

if (!getUser('user')) {
  window.location.href = './index.html';
}
