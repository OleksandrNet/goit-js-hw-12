import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderCard(cards, galleryEl) {
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
  galleryEl.innerHTML = markup;
  new SimpleLightbox('.gallery a');
}
