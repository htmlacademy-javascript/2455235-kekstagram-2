// import { listPhotos } from './create-photos.js';
import { renderThumbnails } from './render-photos.js';
import './open-full-photo.js';
import './validate-form.js';
import './effects-photo.js';
import { getData, ErrorIdTemplates } from './api.js';
import { showRequestInfoTimeout } from './utils.js';
// import { closeUploadForm } from './open-form.js';

const PHOTO_ITEMS_NUMBER = 25;

getData()
  .then((photos) => {
    renderThumbnails(photos.slice(0, PHOTO_ITEMS_NUMBER));
  })
  .catch(() => {
    showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR);
  });
