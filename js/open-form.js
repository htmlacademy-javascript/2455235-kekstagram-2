import { body } from './open-full-photo.js';
import { isEscapeKey } from './utils.js';
import './validate-form.js';
import { pristine } from './validate-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadClose = imgUploadForm.querySelector('.img-upload__cancel');
const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgDescription = imgUploadForm.querySelector('.text__description');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== imgHashtags && document.activeElement !== imgDescription) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const clearForm = () => {
  imgUploadForm.reset();
};

function openUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadClose.addEventListener('click', closeUploadForm);
}

function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadClose.removeEventListener('click', closeUploadForm);
  pristine.reset();
  clearForm();
}

imgUploadInput.addEventListener('change', openUploadForm);
export { imgUploadForm, imgHashtags, closeUploadForm };
