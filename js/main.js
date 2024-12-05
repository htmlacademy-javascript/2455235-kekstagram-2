// import { listPhotos } from './create-photos.js';
import {renderThumbnails} from './render-photos.js';
import './open-full-photo.js';
import { setUserFormSubmit } from './validate-form.js';
import './effects-photo.js';
import { getData, RequestResultIdTemplates } from './api.js';
import { showAlert } from './utils.js';
import { closeUploadForm } from './open-form.js';

const PHOTO_ITEMS_NUMBER = 25;

getData()
  .then((photos) => {
    renderThumbnails(photos.slice(0, PHOTO_ITEMS_NUMBER));
  })
  .catch(
    () => {
      showAlert(RequestResultIdTemplates.LOAD_ERROR);
    }
  );

setUserFormSubmit(closeUploadForm);
