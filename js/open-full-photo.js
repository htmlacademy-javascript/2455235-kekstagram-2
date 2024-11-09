import { picturesContainer } from './render-photos.js';
import {isEscapeKey, isEnterKey} from './utils.js';
import {renderFullPhoto} from './render-full-photo.js';
import { listPhotos } from './create-photos.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
let chosenPhoto;

function openFullPhoto() {
  bigPicture.classList.remove('hidden');
}

function closeFullPhoto() {
  bigPicture.classList.add('hidden');
}

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    chosenPhoto = evt.target.closest('.picture').getAttribute('data-id');
    renderFullPhoto(chosenPhoto, listPhotos);
    openFullPhoto();
  }
});

bigPictureCancel.addEventListener('click', () => {
  closeFullPhoto();
});

bigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt) || isEscapeKey(evt)) {
    closeFullPhoto();
  }
});

export { bigPicture, openFullPhoto };
