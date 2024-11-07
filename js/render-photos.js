import { findTemplate } from './utils.js';

const template = findTemplate('picture');
const picturesContainer = document.querySelector('.pictures');


const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.href = photo.url;
  thumbnail.dataset.id = photo.id;
  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  return thumbnail;
};

const renderThumbnails = (photos) => {
  picturesContainer.append(...photos.map((item) =>(createThumbnail(item))));
};

export {renderThumbnails};
