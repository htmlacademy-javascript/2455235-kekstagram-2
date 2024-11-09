const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountFullPhoto = bigPicture.querySelector('.social__comment-count');
const shownComments = commentsCountFullPhoto.querySelector('.social__comment-shown-count');
const totalComments = commentsCountFullPhoto.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const buttonMoreComments = bigPicture.querySelector('.comments-loader');

const renderCommentsFullPhoto = (comments) =>{
  commentsCountFullPhoto.classList.add('hidden');
  buttonMoreComments.classList.add('hidden');
  comments.forEach((comment) => {
    commentsList.insertAdjacentHTML(
      'afterbegin',
      `<li class="social__comment">
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
        <p class="social__text">${comment.message}</p>
      </li>`,
    );
  });
};

const renderFullPhoto = (chosenPhotoID, listPhotos) => {
  const dataForBigPhoto = listPhotos.find((item) => item.id === chosenPhotoID);
  bigPictureImg.src = dataForBigPhoto.url;
  likesCount.textContent = dataForBigPhoto.likes;
  shownComments.textContent = dataForBigPhoto.comments.length;
  totalComments.textContent = dataForBigPhoto.comments.length;
  bigPictureDescription.textContent = dataForBigPhoto.description;
  renderCommentsFullPhoto(dataForBigPhoto.comments);
};

export { renderFullPhoto };
