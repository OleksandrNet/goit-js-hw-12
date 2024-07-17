import { getPhoto } from './js/pixabay-api';
import { renderCard } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryEl = document.querySelector('.gallery');
const searchEl = document.querySelector('.search');
const loaderEl = document.querySelector('.loader');

searchEl.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const formEl = event.currentTarget;
  const queryValue = formEl.elements.query.value.trim().toLowerCase();

  if (queryValue === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('hidden');

  getPhoto(queryValue)
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error('No images found');
      }
      renderCard(data.hits, galleryEl);
    })
    .catch(onFetchError)
    .finally(() => {
      loaderEl.classList.add('hidden');
      formEl.reset();
    });
}

function onFetchError(error) {
  iziToast.error({
    title: 'Error',
    message:
      error.message ||
      'Sorry, there are no images matching your search query. Please try again!',
  });
}
