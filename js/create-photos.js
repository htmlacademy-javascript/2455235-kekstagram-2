import {getRandomInteger, getIndexIncrement} from './utils.js';
import {getDataForPhotos} from './data.js';

const PHOTO_ITEMS_NUMBER = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const {DESCRIPTIONS, COMMENTS, NAMES} = getDataForPhotos();

const getCommentCounter = getIndexIncrement();

const createComment = (index = getCommentCounter()) => ({
  id: `${index}`,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const getPhotoCounter = getIndexIncrement();

const createPhoto = (index = getPhotoCounter()) => ({
  id: `${index}`,
  url: `photos/${index}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)},
    createComment)
});

const listPhotos = Array.from(
  { length: PHOTO_ITEMS_NUMBER },
  createPhoto
);

export {listPhotos};
