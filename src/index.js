import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/src/notiflix.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_N0KiowZ2ChGItiqqGJCQ3H8Eu8C6RxOFn3EMEECuNrRKCvdVHWHuwvAd0AarBdEp';

const breedSelect = document.querySelector('.breed-select');
const catDetails = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.addEventListener('change', onSelect);

function onSelect(event) {
  const breedId = event.target.value;
  if (breedId) {
    loadingPage();
    getBreed(breedId);
    Notiflix.Loading.remove();
  } else {
    Notiflix.Notify.failure('Cats are busy, try again later.');
  }
}

function getBreed(breedId) {
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catInfo = response.data[0];
      createCat(catInfo);
    })
    .catch(function (error) {
      Notiflix.Notify.failure('Cat not found');
    })
    .finally(function loadedPage() {
      Notiflix.Loading.remove();
    });
}

function createCat(catInfo) {
  const { name, description, temperament } = catInfo.breeds[0];
  const { url } = catInfo;
  const catContainer = `<div class="cat-box"><img src="${url}" alt="">
    <div class="desc-content">
      <h2>${name}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div></div>`;
  catDetails.innerHTML = catContainer;
}

function showCat(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function loadingPage() {
  Notiflix.Loading.dots('Loading kitties, please wait...', {
    backgroundColor: 'rgb(150, 129, 235)',
  });
}

function runApp() {
  loadingPage();
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;
      showCat(breeds);
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
}

document.addEventListener('DOMContentLoaded', () => {
  runApp();
});

loader.style.display = 'none';
error.style.display = 'none';
