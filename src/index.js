import './sass/index.scss';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetch.js';
import { renderImages } from './js/render.js';
import { onScroll} from './js/scroll.js';


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');

let query = '';
let page = 1;
let simpleLightBox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

addEventListener('scroll', onScroll);

function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
    return;
  }

  fetchImages(query, page)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        renderImages(data.hits);
        simpleLightBox.refresh();
        loadMoreBtn.classList.remove('is-hidden');
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
}

function onLoadMoreBtn() {
  page += 1;
  simpleLightBox.destroy();

  fetchImages(query, page)
    .then(({ data }) => {
      renderImages(data.hits);
      simpleLightBox.refresh();
      const totalPages = Math.ceil(data.totalHits / 40);
      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      }
    })
    .catch(error => console.log(error));
}


