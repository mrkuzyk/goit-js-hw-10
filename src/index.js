import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const input = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 1000;

function fetchCountries(names) {
    return fetch(`https://restcountries.com/v3.1/name/${names}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
};

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const searchCountry = (e.target.value).trim();

    if (searchCountry === "") {
        return
    }

    fetchCountries(searchCountry)
        .then(country => {
            if (country.length > 10) {
                return Notify.info('Too many matches found. Please enter a more specific name.')
            }

            if (country.length > 1) {
                return console.log(country);
            }

            // return console.log(country[0]);
            const markup = createCardMarkup(country[0]);
        })
        .catch(() => { return Notify.failure('Oops, there is no country with that name') });
};
