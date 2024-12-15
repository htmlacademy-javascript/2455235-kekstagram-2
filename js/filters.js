import { getRandomInteger } from './utils.js';

const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const PHOTO_NUMBERS_DEFAULT = 25;
const PHOTO_NUMBERS_RANDOM = 10;


const showFilters = () => filters.classList.remove('img-filters--inactive');

const setFilterClick = (cb) => {
  filters.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains(ACTIVE_BUTTON_CLASS)) {
      filtersButtons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
      const currentFilter = evt.target;
      currentFilter.classList.add(ACTIVE_BUTTON_CLASS);
      const dataFilterId = currentFilter.getAttribute('id');
      cb(dataFilterId);
    }
  });
};

const getPhotosToRender = (photos, filter) => {
  let photosToRender = [];
  let copyPhotos = photos.slice();
  if (filter === FILTERS.random) {
    for(let i = 0; i < PHOTO_NUMBERS_RANDOM; i++){
      const randomPhotoIndex = getRandomInteger(0, copyPhotos.length - 1);
      photosToRender.push(copyPhotos[randomPhotoIndex]);
      copyPhotos = copyPhotos.filter((item, index) => index !== randomPhotoIndex);
    }
    return photosToRender;
  } else if (filter === FILTERS.discussed) {
    photosToRender = copyPhotos.sort((a,b) => b.comments.length - a.comments.length).slice(0, PHOTO_NUMBERS_DEFAULT);
    return photosToRender;
  }
  photosToRender = copyPhotos.slice(0, PHOTO_NUMBERS_DEFAULT);
  return photosToRender;
};

export { showFilters, setFilterClick, getPhotosToRender };
