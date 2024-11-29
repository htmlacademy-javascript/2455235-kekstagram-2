//1. Не забыть исправить магическое число. 2. Можно ли в этот файл экспортировать уже найденный элемент контейнер открытой формы, чтобы опять не искать по всему документу. 3.
import { imgUploadForm } from './open-form.js';

const scale = imgUploadForm.querySelector('.scale');

const scaleValue = scale.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
const effectsRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');


const SCALE_STEP = 25;

const FILTER_EFFECTS = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: [0, 1],
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: [0, 1],
    step: 0.1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: [0, 100],
    step: 1,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: [0, 3],
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    range: [1, 3],
    unit: '',
    step: 0.1,
  },
};

const changePhotoSize = (action, scaleData) => {
  const newScaleValue =
    action === '+' ? scaleData + SCALE_STEP : scaleData - SCALE_STEP;
  imgUploadPreview.style.transform = `scale(${newScaleValue * 0.01})`;
  scaleValue.setAttribute('value', `${newScaleValue}%`);
};

scale.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('scale__control--smaller') &&
    scaleValue.value !== '25%'
  ) {
    changePhotoSize('-', parseInt(scaleValue.value, 10));
  } else if (
    evt.target.classList.contains('scale__control--bigger') &&
    scaleValue.value !== '100%'
  ) {
    changePhotoSize('+', parseInt(scaleValue.value, 10));
  }
});

sliderElement.style.display = 'none';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  // step: 1,
  // connect: 'lower',
  // format: {
  //   to: function (value) {
  //     if (Number.isInteger(value)) {
  //       return value.toFixed(0);
  //     }
  //     return value.toFixed(1);
  //   },
  //   from: function (value) {
  //     return parseFloat(value);
  //   },
  // },
});

effectsRadioButtons.forEach((button) =>{
  button.addEventListener('click', (evt) => {
    if (evt.target.value !== 'none') {
      sliderElement.style.display = 'block';
      const effect = evt.target.value;
      effectLevelValue.setAttribute('data-effect', effect);
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: FILTER_EFFECTS[effect].range[0],
          max: FILTER_EFFECTS[effect].range[1]
        },
        start: FILTER_EFFECTS[effect].range[1],
        step: FILTER_EFFECTS[effect].step
      });
    } else if (evt.target.value === 'none') {
      sliderElement.style.display = 'none';
    }
  });


  // else {
  //   sliderElement.noUiSlider.updateOptions({
  //     range: {
  //       min: 0,
  //       max: 100,
  //     },
  //     step: 1
  //   });
  //   sliderElement.noUiSlider.set(80);
  //   }
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  if(effectLevelValue.dataset.effect) {
    console.log(FILTER_EFFECTS[effectLevelValue.dataset.effect].filter);

    console.log(`${FILTER_EFFECTS[effectLevelValue.dataset.effect].filter}(${effectLevelValue.value.trim()}${FILTER_EFFECTS[effectLevelValue.dataset.effect].unit})`);
    imgUploadPreview.style.filter = `${FILTER_EFFECTS[effectLevelValue.dataset.effect].filter}(${effectLevelValue.value.trim()}${FILTER_EFFECTS[effectLevelValue.dataset.effect].unit})`;
  }

  // ;
  // console.log(`${FILTER_EFFECTS[effectLevelValue.dataset.effect]}(${effectLevelValue.value})`);
});
