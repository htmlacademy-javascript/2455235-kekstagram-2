const scale = document.querySelector('.scale');
const scaleValue = scale.querySelector('.scale__control--value');

const SCALE_STEP = 25;

const changePhotoSize = (action, scaleData) => {
  let newScaleValue;
  if(action === 'decrement') {
    newScaleValue = `${(parseInt(scaleData.slice(0, -1), 10) - SCALE_STEP).toString()}%`;
  }else {
    newScaleValue = `${(parseInt(scaleData.slice(0, -1), 10) + SCALE_STEP).toString()}%`;
  }
  scaleValue.value = newScaleValue;
  scaleValue.setAttribute('value', newScaleValue);

  console.log(newScaleValue);
};

scale.addEventListener('click', (evt) => {
  console.log(scaleValue.value);
  if ((evt.target.classList.contains('scale__control--smaller') &&
    scaleValue.value !== '25%')) {
    changePhotoSize('decrement', scaleValue.value);
  } else if (evt.target.classList.contains('scale__control--bigger') &&
      scaleValue.value !== '100%') {
    changePhotoSize('increment', scaleValue.value);
  }
});
