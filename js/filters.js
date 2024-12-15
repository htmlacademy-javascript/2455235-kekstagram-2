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
  const copyPhotos = photos.slice();
  if (filter === FILTERS.random) {
    photosToRender = copyPhotos.sort(SORT_FUNCTIONS.random).slice(0, PHOTO_NUMBERS_RANDOM);
    return photosToRender;
  } else if (filter === FILTERS.discussed) {
    photosToRender = copyPhotos.sort(SORT_FUNCTIONS.discussed).slice(0, PHOTO_NUMBERS_DEFAULT);
    return photosToRender;
  } else{
    photosToRender = copyPhotos.slice(0, PHOTO_NUMBERS_DEFAULT);
    return photosToRender;
  }
};

export { showFilters, setFilterClick, getPhotosToRender };
