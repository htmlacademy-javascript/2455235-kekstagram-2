const imgUploadForm = document.querySelector('.img-upload__form');
const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgComments = imgUploadForm.querySelector('.text__description');
const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MAX_NUMBER_HASHES = 5;
let hashArray = [];
let errorMassege;

const errorsHash = [
  {
    check: hashArray.some((hash) => hash.includes('#')),
    error: 'хэштеги разделяются пробелами',
  },
  {
    check: hashArray.some((hash) => hash[0] !== '#'),
    error: 'хэштег начинается с символа # (решётка);',
  },
  {
    check: hashArray.some((hash) => hash === '#'),
    error: 'хеш-тег не может состоять только из одной решётки',
  },
  {
    check: hashArray.some((hash) => /^#[a-zа-яё0-9]$/i.test(hash)),
    error: 'строка после решётки должна состоять из букв и чисел',
  },
  {
    check: hashArray.some((hash) => hash.length > MAX_HASH_LENGTH),
    error: `максимальная длина одного хэштега ${MAX_HASH_LENGTH} символов, включая решётку`,
  },
  {
    check: hashArray > MAX_NUMBER_HASHES,
    error: `нельзя указать больше ${MAX_NUMBER_HASHES} хэштегов`,
  }
];

const pristine = new Pristine(
  imgUploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  }, false
);

// const hashErrorMassege = (hashArray) =>{
//   [...hashArray].map((hash) => {
//     if (/^#$/i.test(hash)) {
//       console.log(errorsHash.nohash);
//       return errorsHash.nohash;
//     }
//   }
//   );

// };

function validateHashtags (value) {
  if(!value) {
    return true;
  }

  hashArray = value.trim().toLowerCase();
  console.log(hashArray);

  return errorsHash.every((errorHash) =>{
    const isInvalid = errorHash.check;
    console.log(isInvalid);
    if(isInvalid) {
      console.log(errorsHash.error);
      errorMassege = errorsHash.error;
    }
    return !isInvalid;
  });
}

// const hashArray = value.trim().split(' ');
// if(hashArray.every((hash) => /^#[a-zа-яё0-9]{1,19}$/i.test(hash)) && [...new Set(hashArray)].length === hashArray.length) {
//   return true;
// } else {
//   hashErrorMassege(hashArray);
//   return false;
// }


function validateComment (value) {
  return value.length >= 0 && value.length < 140;
}

const commentErrorMassege = () =>`максимальная длина комментария ${MAX_COMMENT_LENGTH}`;

pristine.addValidator(imgHashtags, validateHashtags, errorMassege);
pristine.addValidator(imgComments, validateComment, commentErrorMassege);

imgUploadForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  if(pristine.validate()){
    imgUploadForm.submit();
  }
});
