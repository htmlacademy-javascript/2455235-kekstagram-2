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

const disableShowcomments = (commentsLength) => {
  buttonMoreComments.classList.add('hidden');
  shownComments.textContent = commentsLength;
};

const getCommentsToRender = (comments) => {
  if(comments.length === 0) {
    disableShowcomments(comments.length);
    return comments;
  }
  indexCounter += OPEN_COMMENTS_ON_CLICK;
  if (comments.length <= OPEN_COMMENTS_ON_CLICK) {
    disableShowcomments(comments.length);
    return comments;
  }
  if (indexCounter >= comments.length) {
    disableShowcomments(comments.length);
  } else {
    shownComments.textContent = indexCounter;
  }
  return comments.slice(indexCounter - OPEN_COMMENTS_ON_CLICK, indexCounter);
};

const renderFullPhoto = (chosenPhotoID, listPhotos) => {
  const dataForBigPhoto = listPhotos.find((item) => item.id === parseInt(chosenPhotoID, 10));
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

const clearComments = () => {
  commentsList.innerHTML = '';
  buttonMoreComments.classList.remove('hidden');
  commentsData = [];
  indexCounter = 0;
};

export { renderFullPhoto, clearComments };
