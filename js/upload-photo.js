import { imgUploadForm } from './open-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = imgUploadForm.querySelector('.img-upload__input');

const imgPhotoPreview = imgUploadForm.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPhotoPreview.src = URL.createObjectURL(file);
  }
});
