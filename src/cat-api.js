function fetchBreeds() {
  const url = `https://api.thecatapi.com/v1/breeds?api_key=live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp`;
  return fetch(url).then(response => response.json());
}

function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?api_key=live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp&breed_ids=${breedId}`;
  return fetch(url).then(response => response.json());
}

export { fetchBreeds, fetchCatByBreed };

// export function fetchBreeds() {
//   return axios
//     .get('https://api.thecatapi.com/v1/breeds')
//     .then(response => response.data);
// }

// export function fetchCatByBreed(breedId) {
//   return axios
//     .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
//     .then(response => response.data);
// }
