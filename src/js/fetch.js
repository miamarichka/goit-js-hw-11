import axios from 'axios';

const API_KEY = '29668531-f69cdb360ade2bf58c2cb5997';
const baseURL = `https://pixabay.com/api/`;

axios.defaults.baseURL = baseURL;

export async function fetchImages(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: page,
  };
  return await axios.get('/', { params });
}
