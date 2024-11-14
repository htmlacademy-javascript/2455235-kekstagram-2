import { body } from './open-full-photo.js';

const imgUploadSection = document.querySelector('.img-upload');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
console.log(imgUploadInput, imgUploadOverlay);

const openFormAddPhoto = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

imgUploadInput.addEventListener('change', openFormAddPhoto);

