const imgUploadForm = document.querySelector('.img-upload__form');
const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgComments = imgUploadForm.querySelector('.text__description');
const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MAX_NUMBER_HASHES = 5;
let hashArray = [];

const checkHashErrors = () => [
  {
    check: hashArray.some((hash) => hash.slice(1).includes('#')),
    error: 'хэштеги разделяются пробелами',
  },
  {
    check: hashArray.some((hash) => hash[0] !== '#'),
    error: 'хэштег начинается с символа # (решётка)',
  },
  {
    check: hashArray.some((hash) => hash === '#'),
    error: 'хеш-тег не может состоять только из одной решётки',
  },
  {
    check: hashArray.some(
      (hash) => !/^[a-zа-яё0-9]{1,19}$/i.test(hash.slice(1))
    ),
    error: 'строка после решётки должна состоять из букв и чисел',
  },
  {
    check: hashArray.some((hash) => hash.length > MAX_HASH_LENGTH),
    error: `максимальная длина одного хэштега ${MAX_HASH_LENGTH} символов, включая решётку`,
  },
  {
    check: hashArray.length > MAX_NUMBER_HASHES,
    error: `нельзя указать больше ${MAX_NUMBER_HASHES} хэштегов`,
  },
  {
    check: [...new Set(hashArray)].length !== hashArray.length,
    error: 'один и тот же хэштег не может быть использован дважды',
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

// function hashErrorMassege (errorText) {return errorText};
let hashErrorMassege;
function validateHashtags(value) {
  if (!value) {
    return true;
  }

  hashArray = value.trim().toLowerCase().split(' ');
  const isValid = checkHashErrors().every((errorHash) => {
    const isInvalid = errorHash.check;
    if (isInvalid) {
      hashErrorMassege = errorHash.error;
      console.log(hashErrorMassege);
    }
    return !isInvalid;
  });
  return isValid;
}

const hashError = () =>
  `${hashErrorMassege}`;

function validateComment(value) {
  return value.length >= 0 && value.length < 140;
}

const commentErrorMassege = () =>
  `максимальная длина комментария ${MAX_COMMENT_LENGTH}`;

pristine.addValidator(imgHashtags, validateHashtags, hashError);
pristine.addValidator(imgComments, validateComment, commentErrorMassege);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    console.log(hashErrorMassege);
      // imgUploadForm.submit();
  }
});
