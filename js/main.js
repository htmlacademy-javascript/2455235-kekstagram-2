import { renderThumbnails } from './render-photos.js';
import { getBigPicture, renderFullPhoto } from './open-full-photo.js';
import { setUserFormSubmit } from './validate-form.js';
import { onUploadCloseClick } from './open-form.js';
import './effects-photo.js';
import { getData, ErrorIdTemplates } from './api.js';
import { showRequestInfoTimeout } from './utils.js';
import { showFilters, setFilters } from './filters.js';
import './upload-photo.js';

const PHOTO_ITEMS_NUMBER = 25;

getData()
  .then((photos) => {
    const newPhotos = photos.slice(0, PHOTO_ITEMS_NUMBER);
    renderThumbnails(newPhotos);
    showFilters();
    setFilters(photos);
    getBigPicture((chosenPhotoID) => renderFullPhoto(chosenPhotoID, newPhotos));
  })
  .catch(() => {
    showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR);
  });

setUserFormSubmit(onUploadCloseClick);
