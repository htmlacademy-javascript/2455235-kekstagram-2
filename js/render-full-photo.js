const bigPicture = document.querySelector('.big-picture');
// const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
// const socialComments = bigPicture.querySelector('.social__comments');
// const socialCaption = bigPicture.querySelector('.social__caption');

const renderFullPhoto = (chosenPhoto, listPhotos) =>{
  const currentPhoto = listPhotos.find((item)=> item.id === chosenPhoto);
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  bigPictureImg.src = currentPhoto.url;
  console.log(bigPictureImg.src);
  likesCount.textContent = currentPhoto.likes;
  return {bigPictureImg, likesCount};
};

export { renderFullPhoto };
