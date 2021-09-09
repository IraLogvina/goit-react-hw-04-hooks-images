const API_KEY = '22412207-a0ef56cb918658d27ea3da2a0';
const BASE_URL = `https://pixabay.com/api`;

function fetchImage({ query = '', page = 1 }) {
  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

const ImageApi = {
  fetchImage,
};

export default ImageApi;
