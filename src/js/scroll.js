import { fetchImages } from "./fetch";

export { onScroll};

function onScroll() {
  // const { height: cardHeight } = document
  // .querySelector('.gallery') 
  // .firstElementChild.getBoundingClientRect();

  // window.scrollTo({
  //     top: cardHeight * 2,
  //     behavior: 'smooth'
  //   })
    // ----------це робить жахливий скрол вверх

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
  };

}

