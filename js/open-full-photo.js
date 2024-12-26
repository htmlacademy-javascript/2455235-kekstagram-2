import { picturesContainer } from './render-photos.js';
import { isEscapeKey } from './utils.js';

const OPEN_COMMENTS_ON_CLICK = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountFullPhoto = bigPicture.querySelector(
  '.social__comment-count'
);
const shownComments = commentsCountFullPhoto.querySelector(
  '.social__comment-shown-count'
);
const totalComments = commentsCountFullPhoto.querySelector(
  '.social__comment-total-count'
);
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const buttonMoreComments = bigPicture.querySelector('.comments-loader');

let indexCounter = 0;
let commentsData = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureCloseClick();
  }
};

const openBigPhoto = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const clearComments = () => {
  commentsList.innerHTML = '';
  buttonMoreComments.classList.remove('hidden');
  commentsData = [];
  indexCounter = 0;
};

function onBigPictureCloseClick() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearComments();
}

const getBigPicture = (cb) => {
  picturesContainer.addEventListener('click', (evt) => {
    const chosenPhoto = evt.target.closest('.picture');
    if (chosenPhoto) {
      evt.preventDefault();
      const chosenPhotoID = chosenPhoto.getAttribute('data-id');
      openBigPhoto();
      cb(chosenPhotoID);
    }
  });
};

bigPictureClose.addEventListener('click', onBigPictureCloseClick);

const renderComments = (nextComments) => {
  nextComments.forEach((comment) => {
    commentsList.insertAdjacentHTML(
      'beforeend',
      `<li class='social__comment'>
        <img
          class='social__picture'
          src='${comment.avatar}'
          alt='${comment.name}'
          width='35' height='35'>
        <p class='social__text'>${comment.message}</p>
      </li>`
    );
  });
};

const disableShowСomments = (commentsLength) => {
  buttonMoreComments.classList.add('hidden');
  shownComments.textContent = commentsLength;
};

const getCommentsToRender = (comments) => {
  if (comments.length === 0) {
    disableShowСomments(comments.length);
    return comments;
  }
  indexCounter += OPEN_COMMENTS_ON_CLICK;
  if (comments.length <= OPEN_COMMENTS_ON_CLICK) {
    disableShowСomments(comments.length);
    return comments;
  }
  if (indexCounter >= comments.length) {
    disableShowСomments(comments.length);
  } else {
    shownComments.textContent = indexCounter;
  }
  return comments.slice(indexCounter - OPEN_COMMENTS_ON_CLICK, indexCounter);
};

const renderFullPhoto = (chosenPhotoID, listPhotos) => {
  const dataForBigPhoto = listPhotos.find(
    (item) => item.id === parseInt(chosenPhotoID, 10)
  );
  bigPictureImg.src = dataForBigPhoto.url;
  likesCount.textContent = dataForBigPhoto.likes;
  totalComments.textContent = dataForBigPhoto.comments.length;
  bigPictureDescription.textContent = dataForBigPhoto.description;
  commentsData = dataForBigPhoto.comments;
  renderComments(getCommentsToRender(commentsData));
};

buttonMoreComments.addEventListener('click', () => {
  renderComments(getCommentsToRender(commentsData));
});

export { body, getBigPicture, renderFullPhoto };
