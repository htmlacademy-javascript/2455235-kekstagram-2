import { picturesContainer } from './render-photos.js';
import {isEscapeKey} from './utils.js';
import {renderFullPhoto, clearComments, buttonMoreComments} from './render-full-photo.js';
import { listPhotos } from './create-photos.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

function openFullPhoto() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullPhoto() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonMoreComments.removeEventListener('click', ()=>{});
  clearComments();
}

picturesContainer.addEventListener('click', (evt) => {
  const chosenPhoto = evt.target.closest('.picture');
  if (chosenPhoto) {
    evt.preventDefault();
    const chosenPhotoID = chosenPhoto.getAttribute('data-id');
    renderFullPhoto(chosenPhotoID, listPhotos);
    openFullPhoto();
  }
});

bigPictureClose.addEventListener('click', closeFullPhoto);

