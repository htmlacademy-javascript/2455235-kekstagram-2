import { listPhotos } from './create-photos.js';
console.log(listPhotos);

/* <a href="#" class="picture">
<img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
<p class="picture__info">
  <span class="picture__comments"></span>
  <span class="picture__likes"></span>
</p>
</a> */

const template = document.querySelector('#picture'). content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.href = photo.url;
  thumbnail.dataset.id = photo.id;
  const image = template.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  return thumbnail;
};

listPhotos.forEach((photo) =>{
  fragment.appendChild(createThumbnail(photo));
});

picturesContainer.appendChild(fragment);

export {picturesContainer};
