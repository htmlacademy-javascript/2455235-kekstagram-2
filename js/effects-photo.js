const SCALE_STEP = 25;

const ScaleMaxMin = {
  SCALE_MIN: '25%',
  SCALE_MAX: '100%',
};

const SliderDefaultValues = {
  SLIDER_MIN: 0,
  SLIDER_MAX: 100,
  SLIDER_START: 100
};

const FilterEffects = {
  CHROME:{
    FILTER: 'grayscale',
    UNIT: '',
    RANGE: [0, 1],
    STEP: 0.1,
  },
  SEPIA: {
    FILTER: 'sepia',
    UNIT: '',
    RANGE: [0, 1],
    STEP: 0.1,
  },
  MARVIN: {
    FILTER: 'invert',
    UNIT: '%',
    RANGE: [0, 100],
    STEP: 1,
  },
  PHOBOS: {
    FILTER: 'blur',
    UNIT: 'px',
    RANGE: [0, 3],
    STEP: 0.1,
  },
  HEAT: {
    FILTER: 'brightness',
    UNIT: '',
    RANGE: [1, 3],
    STEP: 0.1,
  },
};

const ScaleAction = {
  INCREASE: '+',
  DECREASE: '-'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const scaleValue = imgUploadForm.querySelector('.scale__control--value');
const scale = imgUploadForm.querySelector('.scale');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');

sliderContainer.classList.add('hidden');

const changePhotoSize = (action, scaleData) => {
  const newScaleValue =
  action === ScaleAction.INCREASE ? scaleData + SCALE_STEP : scaleData - SCALE_STEP ;
  imgUploadPreview.style.transform = `scale(${newScaleValue * 0.01})`;
  scaleValue.setAttribute('value', `${newScaleValue}%`);
};

scale.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('scale__control--smaller') &&
    scaleValue.value !== ScaleMaxMin.SCALE_MIN
  ) {
    changePhotoSize(ScaleAction.DECREASE, parseInt(scaleValue.value, 10));
  } else if (
    evt.target.classList.contains('scale__control--bigger') &&
    scaleValue.value !== ScaleMaxMin.SCALE_MAX
  ) {
    changePhotoSize(ScaleAction.INCREASE, parseInt(scaleValue.value, 10));
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min: SliderDefaultValues.SLIDER_MIN,
    max: SliderDefaultValues.SLIDER_MAX,
  },
  start: SliderDefaultValues.SLIDER_START
});

const updateSliderData = (effect) => {
  const effectInFilters = effect.toUpperCase();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: FilterEffects[effectInFilters].RANGE[0],
      max: FilterEffects[effectInFilters].RANGE[1]
    },
    start: FilterEffects[effectInFilters].RANGE[1],
    step: FilterEffects[effectInFilters].STEP
  });
};

const changePhotoStyle = (effect) => {
  imgUploadPreview.style.filter = `${effect.FILTER}(${effectLevelValue.value.trim()}${effect.UNIT})`;
};

effectsRadioButtons.forEach((button) =>{
  button.addEventListener('change', (evt) => {
    imgUploadPreview.style.filter = 'unset';
    if (evt.target.value !== 'none') {
      sliderContainer.classList.remove('hidden');
      const effect = evt.target.value;
      effectLevelValue.setAttribute('data-effect', effect);
      updateSliderData(effect);
    } else if (evt.target.value === 'none') {
      sliderContainer.classList.add('hidden');
    }
  });
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = parseFloat(sliderElement.noUiSlider.get());
  if(effectLevelValue.dataset.effect) {
    const effect = FilterEffects[effectLevelValue.dataset.effect.toUpperCase()];
    changePhotoStyle(effect);
  }
});

const removeScaleChanges = () => {
  scaleValue.setAttribute('value', `${ScaleMaxMin.SCALE_MAX}`);
  imgUploadPreview.style.transform = 'scale(1)';
};
export {removeScaleChanges, imgUploadForm };
