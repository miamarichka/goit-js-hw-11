import './sass/index.scss';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetch.js';
import { markUpImg } from './js/render.js';
import { onScroll} from './js/scroll.js';
import { searchForm, gallery, loadMoreBtn, btnSubmit} from './js/refs.js';
 
let page = 1;
let query = '';
let simpleLightBox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);
document.addEventListener('scroll', onScroll);


function onSearchForm(e) {
  e.preventDefault();

  if (query === e.currentTarget.searchQuery.value) {
    Notiflix.Notify.warning(`It's already found! May be another one?`);
    return
  };

  page = 1;
  gallery.innerHTML = '';
  query = e.currentTarget.searchQuery.value.trim();

  if (query === '') {
    loadMoreBtn.classList.add('is-hidden')
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
    return
  };
 
  fetchImages(query, page)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        gallery.insertAdjacentHTML('beforeend', markUpImg(data.hits));
        simpleLightBox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (data.totalHits > 40) {
          loadMoreBtn.classList.remove('is-hidden');
        };
      };
    })
    .catch((error) => {
      Notiflix.Notify.warning(error);
    })
    .finally(() => {
      searchForm.reset();
    });
}

function onLoadMoreBtn() {
  page += 1;
  simpleLightBox.refresh();

  fetchImages(query, page)
    .then(({ data }) => {
      loadMoreBtn.classList.remove('is-hidden');
      const totalPages = Math.ceil(data.totalHits / 40);
      gallery.insertAdjacentHTML('beforeend', markUpImg(data.hits));
      simpleLightBox.refresh();
      onScroll();
    
     if (page >= totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
     }
     
    })
    .catch ((error) => {
      Notify.warning(`Error, try again`);
      loadMoreBtn.classList.add('is-hidden');
     });
}
