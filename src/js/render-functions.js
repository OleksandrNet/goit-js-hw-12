import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderCards(cards, galleryEl) {
  const markup = cards
    .map(
      ({ likes, views, comments, downloads, webformatURL, largeImageURL }) => `
        <a href="${largeImageURL}" class="card">
          <div class="card-img-top">
            <img src="${webformatURL}" alt="Image">
          </div>
          <div class="card-body">
            <p class="card-title">Likes: ${likes}</p>
            <p class="card-text">Views: ${views}</p>
            <p class="card-text">Comments: ${comments}</p>
            <p class="card-text">Downloads: ${downloads}</p>
          </div>
        </a>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.gallery a').refresh();
}

export function clearGallery(galleryEl) {
  galleryEl.innerHTML = '';
}

export function showLoader(loaderEl) {
  loaderEl.classList.remove('hidden');
}

export function hideLoader(loaderEl) {
  loaderEl.classList.add('hidden');
}

export function showLoadMoreButton(buttonEl) {
  buttonEl.classList.remove('hidden');
}

export function hideLoadMoreButton(buttonEl) {
  buttonEl.classList.add('hidden');
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}
