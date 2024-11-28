//1. Не забыть исправить магическое число. 2. Можно ли в этот файл экспортировать уже найденный элемент контейнер открытой формы, чтобы опять не искать по всему документу. 3.

const scale = document.querySelector('.scale');
const scaleValue = scale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const SCALE_STEP = 25;

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

const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const sliderElement = effectLevel.querySelector('.effect-level__slider');

const FILTER_EFFECTS = {
  chrome: {
    minfilter: 'grayscale(0)',
    maxfilter: 'grayscale(1)',
    range: [0, 1],
    step: 0.1,
  },
  sepia: {
    minfilter: 'sepia(0)',
    maxfilter: 'sepia(1)',
    range: [0, 1],
    step: 0.1,
  },
  marvin: {
    minfilter: 'invert(0)',
    maxfilter: 'invert(100%)',
    range: [0, 100],
    step: 1,
  },
  phobos: {
    minfilter: 'blur(0)',
    maxfilter: 'blur(3px)',
    range: [0, 3],
    step: 0.1,
  },
  heat: {
    minfilter: 'brightness(1)',
    maxfilter: 'brightness(3)',
    range: [1, 3],
    step: 0.1,
  },
};

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

console.log(effectsList);

effectsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('effects__radio') && evt.target.value !== 'none') {
    sliderElement.style.display = 'block';
    const effect = evt.target.value;
    console.log(effect, FILTER_EFFECTS[effect]);
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
  console.log(effectLevelValue.value);
});
