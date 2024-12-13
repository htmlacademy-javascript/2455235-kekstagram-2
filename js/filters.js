const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');


const showFilters = () => filters.classList.remove('img-filters--inactive');

const setFilterClick = (cb) => {
  filters.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      filtersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
      const currentFilter = evt.target;
      currentFilter.classList.add('img-filters__button--active');
      const dataFilterId = currentFilter.getAttribute('id');
      cb(dataFilterId);
    }
  });
};

export { showFilters, setFilterClick };
