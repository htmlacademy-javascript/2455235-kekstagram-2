import { renderThumbnails } from './render-photos.js';
import './open-full-photo.js';
import './validate-form.js';
import './effects-photo.js';
import { getData, ErrorIdTemplates } from './api.js';
import { showRequestInfoTimeout } from './utils.js';

const PHOTO_ITEMS_NUMBER = 25;

getData()
  .then((photos) => {
    renderThumbnails(photos.slice(0, PHOTO_ITEMS_NUMBER));
  })
  .catch(() => {
    showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR);
  });
