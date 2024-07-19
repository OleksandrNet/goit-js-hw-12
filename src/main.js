import { getPhotos } from './js/pixabay-api';
import {
  renderCards,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showError,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
let totalHits = 0;

const galleryEl = document.querySelector('.gallery');
const searchEl = document.querySelector('.search');
const loaderEl = document.querySelector('.loader');
const loadMoreButtonEl = document.querySelector('.load-more');

searchEl.addEventListener('submit', handleSearch);
loadMoreButtonEl.addEventListener('click', loadMore);

async function handleSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.query.value.trim().toLowerCase();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  page = 1;
  clearGallery(galleryEl);
  hideLoadMoreButton(loadMoreButtonEl);
  showLoader(loaderEl);

  try {
    const data = await getPhotos(query, page);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      throw new Error('No images found');
    }
    renderCards(data.hits, galleryEl);
    showLoadMoreButton(loadMoreButtonEl);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        error.message ||
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    hideLoader(loaderEl);
    searchEl.reset();
  }
}

async function loadMore() {
  page += 1;
  showLoader(loaderEl);

  try {
    const data = await getPhotos(query, page);
    renderCards(data.hits, galleryEl);
    if (galleryEl.children.length >= totalHits) {
      hideLoadMoreButton(loadMoreButtonEl);
      iziToast.info({
        message: "Were sorry, but you've reached the end of search results.",
      });
    }
    smoothScroll();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader(loaderEl);
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    galleryEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
