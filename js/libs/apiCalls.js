import { BASE_URL } from '../configs/configs.js';

export const getAPI = async (url) => {
  try {
    const { data } = await axios.get(url);
    document.querySelector('.loading').innerHTML = '';
    return data;
  } catch (error) {
    console.log(error);
  }
};
