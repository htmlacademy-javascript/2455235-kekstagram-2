import { renderThumbnails } from './render-photos.js';
import { debounce } from './utils.js';

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const SORT_FUNCTIONS = {
  getRandom: () => 0.5 - Math.random(),
  getDiscussed: (a,b) => b.comments.length - a.comments.length
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const PHOTO_NUMBERS_DEFAULT = 25;
const PHOTO_NUMBERS_RANDOM = 10;

const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');

let dataFilterId;
let photos = [];

const showFilters = () => filters.classList.remove('img-filters--inactive');

const debounceRender = debounce(renderThumbnails);

const getPhotosToRender = (filter) => {
  let photosToRender = [];
  const copyPhotos = photos.slice();
  switch (filter) {
    case Filters.RANDOM:
      photosToRender = copyPhotos.sort(SORT_FUNCTIONS.getRandom).slice(0, PHOTO_NUMBERS_RANDOM);
      break;
    case Filters.DISCUSSED:
      photosToRender = copyPhotos.sort(SORT_FUNCTIONS.getDiscussed).slice(0, PHOTO_NUMBERS_DEFAULT);
      break;
    case Filters.DEFAULT:
      photosToRender = copyPhotos.slice(0, PHOTO_NUMBERS_DEFAULT);
      break;
  }
  debounceRender(photosToRender);
};

const onFilterClick = (evt) => {
  if(evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains(ACTIVE_BUTTON_CLASS)) {
    filtersButtons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
    const currentFilter = evt.target;
    currentFilter.classList.add(ACTIVE_BUTTON_CLASS);
    dataFilterId = currentFilter.getAttribute('id');
    getPhotosToRender(dataFilterId);
  }
};

const setFilters = (photosData) => {
  filters.addEventListener('click', onFilterClick);
  photos = photosData;
};

export { showFilters, setFilters };
