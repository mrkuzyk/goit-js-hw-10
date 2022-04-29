export default function fetchCountries(names) {
    return fetch(`https://restcountries.com/v3.1/name/${names}`).then(response => {
        if (!response.ok) {
            throw  Error(response.statusText);
        }
            return response.json();
    })
};