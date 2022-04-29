import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './js/fetchCountries'

const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const input = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 800;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const searchCountry = (e.target.value).trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    if (searchCountry === "") {
        return
    }

    fetchCountries(searchCountry)
        .then(data => {
            if (data.length > 10) {
                return Notify.info('Too many matches found. Please enter a more specific name.')
            }

            if (data.length > 1) {
                return countryList.innerHTML = createMarkupCountryList(data);
            }

            countryInfo.innerHTML = createMarkupCountryInfo(data[0]);
        })
        .catch(() => { return Notify.failure('Oops, there is no country with that name') });
};

function createMarkupCountryList(data) {
    return data
        .map(({ name, flags }) => {
        return `<li><img src="${flags.svg}" alt="country flag" class="flag"> <p class="country">${name.official}</p>`;
        })
        .join('');
}

function createMarkupCountryInfo({ flags, name, capital, population, languages }) {
    return `<img src="${flags.svg}" alt="country flag" class="flag"><h1 class="country">${name.official}</h1><p>Capital: ${capital}</p><p>Population: ${population}</p><p>Lenguages: ${Object.values(languages)}</p>`
}