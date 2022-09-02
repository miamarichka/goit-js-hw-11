import axios from 'axios';

const API_KEY = '29668531-f69cdb360ade2bf58c2cb5997';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function fetchImages(query, page) {
    const response = await axios.get(
        `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
    );

    return response;
  }

