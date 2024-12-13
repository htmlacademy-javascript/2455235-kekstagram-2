import { findTemplate, getRandomInteger } from './utils.js';

const template = findTemplate('picture');
const picturesContainer = document.querySelector('.pictures');

const PHOTO_NUMBERS_DEFAULT = 25;
const PHOTO_NUMBERS_RANDOM = 10;

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  const imageComment = thumbnail.querySelector('.picture__comments');
  const imageLikes = thumbnail.querySelector('.picture__likes');
  thumbnail.href = photo.url;
  thumbnail.dataset.id = photo.id;
  image.src = photo.url;
  image.alt = photo.description;
  imageComment.textContent = photo.comments.length;
  imageLikes.textContent = photo.likes;
  return thumbnail;
};

const getPhotoLikes = (photo) => photo.likes;

const comparePhotos = (photoA, photoB) => {
  const likesA = getPhotoLikes(photoA);
  const likesB = getPhotoLikes(photoB);
  return likesB - likesA;
};


const getDataToRender = (photos, filter) => {
  let arrayToRender = [];
  if (filter === 'filter-random') {
    let newPhotos = photos.slice();
    for(let i = 0; i < PHOTO_NUMBERS_RANDOM; i++){
      const randomPhotoIndex = getRandomInteger(0, newPhotos.length - 1);
      arrayToRender.push(newPhotos[randomPhotoIndex]);
      newPhotos = newPhotos.filter((item, index) => index !== randomPhotoIndex);
    }
    return arrayToRender;
  } else if (filter === 'filter-popular') {
    arrayToRender = photos.sort(comparePhotos).slice(0, PHOTO_NUMBERS_DEFAULT);
    return arrayToRender;
  }
};

const deletePictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picturesContainer.removeChild(picture));
};

const renderThumbnails = (photos) => {
  console.log(photos);
  deletePictures();
  picturesContainer.append(...photos.map((item) =>(createThumbnail(item))));
};

export {renderThumbnails, picturesContainer, deletePictures, getDataToRender};
