import { findTemplate } from './utils.js';

const template = findTemplate('picture');
const picturesContainer = document.querySelector('.pictures');

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

const deletePictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picturesContainer.removeChild(picture));
};

const renderThumbnails = (photos) => {
  deletePictures();
  picturesContainer.append(...photos.map((item) =>(createThumbnail(item))));
};

export {renderThumbnails, picturesContainer, deletePictures};
