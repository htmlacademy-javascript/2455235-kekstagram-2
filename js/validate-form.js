import { imgUploadForm } from './effects-photo.js';
import { sendData, ErrorIdTemplates } from './api.js';
import { showRequestInfo } from './utils.js';
import { body } from './open-full-photo.js';
import { isEscapeKey } from './utils.js';

const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgComments = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MAX_NUMBER_HASHES = 5;

const RequestResultTags = {
  error: {
    SECTION: 'error',
    BUTTON: 'error__button',
    INNER: 'error__inner'
  },
  success: {
    SECTION: 'success',
    BUTTON: 'success__button',
    INNER: 'success__inner'
  }
};

let hashArray = [];
let hashErrorMassege = [];
let infoRequestElement;

const checkHashErrors = () => [
  {
    check: hashArray.some((hash) => hash.slice(1).includes('#')),
    error: ' хэштеги разделяются пробелами',
  },
  {
    check: hashArray.some((hash) => hash[0] !== '#'),
    error: ' хэштег начинается с символа # (решётка)',
  },
  {
    check: hashArray.some((hash) => hash === '#'),
    error: ' хеш-тег не может состоять только из одной решётки',
  },
  {
    check: hashArray.some(
      (hash) => !/^[a-zа-яё0-9]{1,19}$/i.test(hash.slice(1))
    ),
    error: ' строка после решётки должна состоять из букв и чисел',
  },
  {
    check: hashArray.some((hash) => hash.length > MAX_HASH_LENGTH),
    error: ` максимальная длина одного хэштега ${MAX_HASH_LENGTH} символов, включая решётку`,
  },
  {
    check: hashArray.length > MAX_NUMBER_HASHES,
    error: ` нельзя указать больше ${MAX_NUMBER_HASHES} хэштегов`,
  },
  {
    check: [...new Set(hashArray)].length !== hashArray.length,
    error: ' один и тот же хэштег не может быть использован дважды',
  },
];

const pristine = new Pristine(
  imgUploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  },
  false
);

function validateHashtags(value) {
  hashErrorMassege = [];
  if (!value) {
    return true;
  }
  hashArray = value.trim().toLowerCase().split(' ').filter(Boolean);
  checkHashErrors().map((errorHash) => {
    if (errorHash.check) {
      hashErrorMassege.push(errorHash.error);
    }
    return hashErrorMassege;
  });
  return hashErrorMassege.length === 0;
}

function validateComment(value) {
  return value.length >= 0 && value.length < MAX_COMMENT_LENGTH;
}

const commentErrorMassege = () =>
  `максимальная длина комментария ${MAX_COMMENT_LENGTH}`;

const hashesErrorText = () => hashErrorMassege;

pristine.addValidator(imgHashtags, validateHashtags, hashesErrorText);
pristine.addValidator(imgComments, validateComment, commentErrorMassege);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const closeInfo = (evt) => {
  if ((isEscapeKey(evt) && infoRequestElement !== 'error') ||
    evt.target.classList.contains(RequestResultTags[infoRequestElement].BUTTON) ||
    !evt.target.classList.contains(RequestResultTags[infoRequestElement].INNER)
  ) {
    const currentInfoSection = document.querySelector(`.${RequestResultTags[infoRequestElement].SECTION}`);
    currentInfoSection.remove();
    body.removeEventListener('click', closeInfo);
    document.removeEventListener('keydown', closeInfo);
  }
};

const appendInfo = (infoId) => {
  showRequestInfo(infoId);
  body.addEventListener('click', closeInfo);
  document.addEventListener('keydown', closeInfo);
};

const setUserFormSubmit = (cb) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => appendInfo(infoRequestElement = ErrorIdTemplates.SUCCESS))
        .then(() => cb(infoRequestElement))
        .catch(() => appendInfo(infoRequestElement = ErrorIdTemplates.SEND_ERROR))
        .finally(unblockSubmitButton);
    }
  });
};

export { pristine, setUserFormSubmit, infoRequestElement, imgHashtags };
