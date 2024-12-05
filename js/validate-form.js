import { imgUploadForm, imgHashtags } from './open-form.js';
import {sendData, RequestResultIdTemplates} from './api.js';
import { showAlert, findTemplate } from './utils.js';
// import { closeUploadForm } from './open-form.js';

const imgComments = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MAX_NUMBER_HASHES = 5;
let hashArray = [];
let hashErrorMassege = [];

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
  hashArray = value.trim().toLowerCase().split(' ');
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

pristine.addValidator(imgHashtags, validateHashtags,hashesErrorText);
pristine.addValidator(imgComments, validateComment, commentErrorMassege);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const showSuccess = (templateID) => {
  const templateSuccess = findTemplate(templateID);
  const successElement = templateSuccess.cloneNode(true);
  document.body.append(successElement);
};

// showSuccess.addEventListener('change', openUploadForm);

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      {
        blockSubmitButton();
        sendData(new FormData(evt.target))
          .then(onSuccess)
          .then(showSuccess(RequestResultIdTemplates.SUCCESS))
          .catch(
            () => {
              showAlert(RequestResultIdTemplates.SEND_ERROR);
            }
          )
          .finally(unblockSubmitButton);
      }
    }
  });
};

export { setUserFormSubmit, pristine, showSuccess };
