import { body } from './open-full-photo.js';
import { isEscapeKey } from './utils.js';

const imgUploadSection = document.querySelector('.img-upload');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const imgUploadClose = imgUploadSection.querySelector('.img-upload__cancel');
const imgHashtag = imgUploadSection.querySelector('.text__hashtags');
const imgDescription = imgUploadSection.querySelector('.text__description');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const clearForm = () => {
  imgUploadInput.value = '';
  imgHashtag.value = '';
  imgDescription.value = '';
};


function openUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearForm();
}

imgUploadInput.addEventListener('change', openUploadForm);
imgUploadClose.addEventListener('click', closeUploadForm);


