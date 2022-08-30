import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box')
const info = document.querySelector('.country-info')
const list = document.querySelector('.country-list')

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function cleanData(element){
    element.innerHTML = ''
}

function onInput(e){
    e.preventDefault();

    const country = e.target.value.trim();

    if(!country){
        cleanData(list);
        cleanData(info);
        return
    };


    fetchCountries(country)
    .then(data => {
        if(data.length > 10){
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            return
        };
        if(data.length === 1){
            cleanData(list)
            info.innerHTML = oneCountryMarkUp(data)
        } else {
            cleanData(info)
            list.innerHTML = countriesMarkUp(data)
        }
        
    })
    .catch(error => {
        cleanData(list);
        cleanData(info);
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
}



function countriesMarkUp(countries){
    return countries.map(
        ({ name, flags }) =>
          `<li style="list-style: none;font-size: 30px; margin-bottom: 20px">
          <img src="${flags.png}" alt="${name.official}" width="100" height="50" style="margin-right: 30px;">
          <strong>${name.official}</strong>
          </li>`,)
    .join('');
};


function oneCountryMarkUp(country){
    return country.map(
        ({ name, capital, population, flags, languages }) =>
          `<h1>
          <img src="${flags.png}" alt="${name.official}" width="80" height="40" style="margin-right: 30px">${name.official}
          </h1>
          <p style="font-size: 20px;"> <strong > Capital:</strong> ${capital}</p>
          <p style="font-size: 20px;"> <strong > Population:</strong> ${population}</p>
          <p style="font-size: 20px;"> <strong > Languages:</strong> ${Object.values(languages,).join(', ')}</p>`,
      );
    };



<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>