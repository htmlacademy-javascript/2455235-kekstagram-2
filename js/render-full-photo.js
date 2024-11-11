let indexCounter = 0;
const OPEN_COMMENTS_ON_CLICK = 5;
let commentsData = [];

const bigPicture = document.querySelector('.big-picture');
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

const renderCommentsFullPhoto = (comments) => {
  indexCounter += OPEN_COMMENTS_ON_CLICK;
  if (comments.length < indexCounter) {
    buttonMoreComments.disabled = true;
  }
  if (indexCounter > comments.length) {
    buttonMoreComments.disabled = true;
    shownComments.textContent = comments.length;
  } else {
    shownComments.textContent = indexCounter;
  }
  comments.slice(indexCounter - OPEN_COMMENTS_ON_CLICK, indexCounter).forEach((comment) => {
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

const renderFullPhoto = (chosenPhotoID, listPhotos) => {
  const dataForBigPhoto = listPhotos.find((item) => item.id === chosenPhotoID);
  bigPictureImg.src = dataForBigPhoto.url;
  likesCount.textContent = dataForBigPhoto.likes;
  totalComments.textContent = dataForBigPhoto.comments.length;
  bigPictureDescription.textContent = dataForBigPhoto.description;
  commentsData = dataForBigPhoto.comments;
  renderCommentsFullPhoto(commentsData);
};

buttonMoreComments.addEventListener('click', () => {
  renderCommentsFullPhoto(commentsData);
});

const clearComments = () => {
  commentsList.innerHTML = '';
  indexCounter = 0;
  buttonMoreComments.disabled = false;
  buttonMoreComments.removeEventListener();
};

export { renderFullPhoto, clearComments };
