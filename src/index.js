import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 1000;

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

            if (country.length > 1 && country.length < 10 ) {
                return console.log('ok')
            }

            if (country.length === 1) {
                return console.log(country[0])
            }
        })
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
};