import { fetchImages } from "./fetch";

export { onScroll};

function onScroll() {
  const { height: cardHeight } = document
  .querySelector('.gallery') 
  .firstElementChild.getBoundingClientRect();


  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    fetchImages();
  }
}

