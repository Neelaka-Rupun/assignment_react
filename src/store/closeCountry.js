import { distanceFindHandler } from './distanceFind';

export const closestCountry = (country1, countries) => {
    let countryCode = country1;
    const input = countryCode;
    const inputCountry = countries.find(country => country.alpha3Code === input);
    const boaders = inputCountry?.borders ? inputCountry.borders : [];
    //Serched through the internet and found the largerst distence between two countries and assigned that as min distance
    let minDistance = 19994;
    let nearCountry = null;
    countries.filter(country => !boaders.includes(country.alpha3Code)).forEach(country => {
        const distance = distanceFindHandler(country.alpha3Code, input, countries);
        if (distance && minDistance > distance) {
            minDistance = distance;
            nearCountry = country.name;
        }
    });
     
    return nearCountry;

}   