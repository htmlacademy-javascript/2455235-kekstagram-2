import { body } from './open-full-photo.js';
import { isEscapeKey } from './utils.js';
import { pristine, imgHashtags } from './validate-form.js';
import { removeScaleChanges, removeFilterStyle, hideSlider, imgUploadForm } from './effects-photo.js';

const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadClose = imgUploadForm.querySelector('.img-upload__cancel');
const imgDescription = imgUploadForm.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== imgHashtags && document.activeElement !== imgDescription) {
    evt.preventDefault();
    onUploadCloseClick();
  }
};

const clearForm = () => {
  imgUploadForm.reset();
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadClose.addEventListener('click', onUploadCloseClick);
};

function onUploadCloseClick() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadClose.removeEventListener('click', onUploadCloseClick);
  pristine.reset();
  clearForm();
  removeScaleChanges();
  removeFilterStyle();
  hideSlider();
}

export { imgUploadForm, onUploadCloseClick, openUploadForm };
