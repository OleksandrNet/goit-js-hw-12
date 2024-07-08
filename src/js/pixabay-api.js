import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const key = '44800078-24df89d06f24ed99fe7b62add';

function getPhoto(query) {
  return fetch(
    `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

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
    .then(data => renderCard(data.hits))
    .catch(onFetchError)
    .finally(() => {
      loaderEl.classList.add('hidden');
      formEl.reset();
    });
}

function renderCard(cards) {
  const markup = cards
    .map(
      ({ likes, views, comments, downloads, webformatURL, largeImageURL }) => `
    <a href="${largeImageURL}" class="card" </>
      <div class="card-img-top">
        <img class="photo" src="${webformatURL}" alt="Image">
      </div>
      <div class="card-body">
        <p class="card-text">Likes: ${likes}</p>
        <p class="card-text">Views: ${views}</p>
        <p class="card-text">Comments: ${comments}</p>
        <p class="card-text">Downloads: ${downloads}</p>
      </div>
    `
    )
    .join('');
  galleryEl.innerHTML = markup;
  new SimpleLightbox('.gallery a');
}

function onFetchError() {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}
