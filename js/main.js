import { renderThumbnails } from './render-photos.js';
import { getBigPicture } from './open-full-photo.js';
import { renderFullPhoto } from './render-full-photo.js';
import './validate-form.js';
import './effects-photo.js';
import { getData, ErrorIdTemplates } from './api.js';
import { showRequestInfoTimeout } from './utils.js';

const PHOTO_ITEMS_NUMBER = 25;

getData()
  .then((photos) => {
    const newPhotos = photos.slice(0, PHOTO_ITEMS_NUMBER);
    renderThumbnails(newPhotos);
    getBigPicture((chosenPhotoID) => renderFullPhoto(chosenPhotoID, newPhotos));
    // console.log(chosenPhotoID);
  })
  .catch(() => {
    showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR);
  });
