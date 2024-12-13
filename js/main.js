import { renderThumbnails, getDataToRender } from './render-photos.js';
import { getBigPicture } from './open-full-photo.js';
import { renderFullPhoto } from './render-full-photo.js';
import {setUserFormSubmit} from './validate-form.js';
import {closeUploadForm} from './open-form.js';
import './effects-photo.js';
import { getData, ErrorIdTemplates } from './api.js';
import { showRequestInfoTimeout, debounce } from './utils.js';
import { showFilters, setFilterClick } from './filters.js';

const PHOTO_ITEMS_NUMBER = 25;
const RERENDER_DELAY = 500;

getData()
  .then((photos) => {
    const newPhotos = photos.slice(0, PHOTO_ITEMS_NUMBER);
    renderThumbnails(newPhotos);
    setFilterClick(debounce(
      (cd) => renderThumbnails(getDataToRender(photos, cd)),
      RERENDER_DELAY,
    ));
    getBigPicture((chosenPhotoID) => renderFullPhoto(chosenPhotoID, newPhotos));
    showFilters();
  })
  .catch(() => {
    showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR);
  });

setUserFormSubmit(closeUploadForm);
