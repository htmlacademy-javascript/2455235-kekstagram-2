import { renderThumbnails } from './render-photos.js';
import { debounce } from './utils.js';

const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const SORT_FUNCTIONS = {
  random: () => 0.5 - Math.random(),
  discussed: (a,b) => b.comments.length - a.comments.length
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const PHOTO_NUMBERS_DEFAULT = 25;
const PHOTO_NUMBERS_RANDOM = 10;

const showFilters = () => filters.classList.remove('img-filters--inactive');

let dataFilterId;
let photos = [];

const debounceRender = debounce(renderThumbnails);

const getPhotosToRender = (filter) => {
  let photosToRender = [];
  const copyPhotos = photos.slice();
  switch (filter) {
    case FILTERS.random:
      photosToRender = copyPhotos.sort(SORT_FUNCTIONS.random).slice(0, PHOTO_NUMBERS_RANDOM);
      break;
    case FILTERS.discussed:
      photosToRender = copyPhotos.sort(SORT_FUNCTIONS.discussed).slice(0, PHOTO_NUMBERS_DEFAULT);
      break;
    case FILTERS.default:
      photosToRender = copyPhotos.slice(0, PHOTO_NUMBERS_DEFAULT);
      break;
  }
  debounceRender(photosToRender);
};

const setFilterClick = (evt) => {
  if(evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains(ACTIVE_BUTTON_CLASS)) {
    filtersButtons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
    const currentFilter = evt.target;
    currentFilter.classList.add(ACTIVE_BUTTON_CLASS);
    dataFilterId = currentFilter.getAttribute('id');
    getPhotosToRender(dataFilterId);
  }
};

const setFilters = (photosData) => {
  filters.addEventListener('click', setFilterClick);
  photos = photosData;
};

export { showFilters, setFilters, getPhotosToRender };
