const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';


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

export { showFilters, setFilterClick };
