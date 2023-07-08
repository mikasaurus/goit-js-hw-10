// function fetchBreeds() {
//   return fetch(
//     `https://api.thecatapi.com/v1/breeds?api_key=live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function fetchCatByBreed(breedId) {
//   return fetch(
//     `https://api.thecatapi.com/v1/images/${breedId}?api_key=live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

function fetchBreeds() {
  const url = `https://api.thecatapi.com/v1/breeds?api_key=live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp`;
  return fetch(url).then(response => response.json());
}

function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?api_key=live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp&breed_ids=${breedId}`;
  return fetch(url).then(response => response.json());
}

export { fetchBreeds, fetchCatByBreed };
