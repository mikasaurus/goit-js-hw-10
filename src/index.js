import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// const api_key =
//   'live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp';

const breedSelect = document.querySelector('.breed-select');
const catDetails = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const badEnd = document.querySelector('.error');

breedSelect.addEventListener('change', onSelect);

function createSelect({ id, name }) {
  return `<option value="${id}">${name}</option>`;
}

function onSelect(event) {
  loadingPage(catDetails);
  fetchCatByBreed(event.target.value)
    .then(cats => {
      const markup = cats.map(createCat).join('');
      return markup;
    })
    .then(function updateInfo(markup) {
      catDetails.innerHTML = markup;
    })
    .catch(function (error) {
      errorOccurred = true;
      Notiflix.Notify.failure('Cats are busy, try again later.');
    })
    .finally(function loadedPage() {
      Notiflix.Loading.remove();
    });
}

fetchBreeds()
  .then(breeds => {
    if (!breeds.length) throw new Error('Cat not found');
    const markup = breeds.map(createSelect).join('');
    return markup;
  })
  .then(function updateSelect(markup) {
    breedSelect.innerHTML = markup;
    new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(function (error) {
    errorOccurred = true;
    Notiflix.Notify.failure('Cats are busy, try again later.');
  })
  .finally(function loadedPage() {
    Notiflix.Loading.remove();
  });

function createCat({ url, breeds }) {
  const { name, description, temperament } = breeds[0];
  return `<div class="cat-box"><img src="${url}" alt="">
    <div class="desc-content">
      <h2>${name}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div></div>`;
}

function loadingPage(element) {
  element.classList.add('hidden');
  Notiflix.Loading.dots('Loading kitties, please wait...', {
    backgroundColor: 'rgb(150, 129, 235)',
  });
}

loader.style.display = 'none';
badEnd.style.display = 'none';
