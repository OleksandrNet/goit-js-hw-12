import axios from 'axios';

const key = '44800078-24df89d06f24ed99fe7b62add';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPhotos(query, page = 1) {
  const params = {
    key,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
