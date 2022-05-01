import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './js/fetchCountries' //? винесена функція

const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const input = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 800;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const searchCountry = (e.target.value).trim(); //? введена інформація з інпуту
    countryList.innerHTML = ''; //? очищую, якщо щось було намальовано
    countryInfo.innerHTML = ''; //? теж очищую

    //? якщо в інпуті пусто, то на цьому і стоп
    if (searchCountry === "") {
        return
    }

    fetchCountries(searchCountry)
        .then(data => {
            //? якщо більше 10 результатів то повідомлення щоб уточнили
            if (data.length > 10) {
                return Notify.info('Too many matches found. Please enter a more specific name.')
            }

            //? якщо віл 1 до 10 то малюю список країн з прапором
            if (data.length > 1) {
                return countryList.innerHTML = createMarkupCountryList(data);
            }

            //? і коли 1 країна, то малюю її інформацю
            countryInfo.innerHTML = createMarkupCountryInfo(data[0]);
        })
        //? коли помилка
        .catch(() => { return Notify.failure('Oops, there is no country with that name') });
};

//? функція коли 1-10 результатів
function createMarkupCountryList(data) {
    return data
        .map(({ name, flags }) => {
        return `<li><img src="${flags.svg}" alt="country flag" class="flag"> <p class="country">${name.official}</p>`;
        })
        .join('');
}

//? функція з одним результатом
function createMarkupCountryInfo({ flags, name, capital, population, languages }) {
    return `<img src="${flags.svg}" alt="country flag" class="flag"><h1 class="country">${name.official}</h1><p>Capital: ${capital}</p><p>Population: ${population}</p><p>Lenguages: ${Object.values(languages)}</p>`
}