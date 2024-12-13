const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getIndexIncrement() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const findTemplate = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    throw new Error(`Template not found: #${id}`);
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not template: #${id}`);
  }
  return template.content.firstElementChild;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const showRequestInfo = (templateId) => {
  const template = findTemplate(templateId);
  const errorElement = template.cloneNode(true);
  document.body.append(errorElement);
};


const showRequestInfoTimeout = (templateId) => {
  const template = findTemplate(templateId);
  const errorElement = template.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {
  getRandomInteger,
  getIndexIncrement,
  findTemplate,
  isEscapeKey,
  isEnterKey,
  showRequestInfo,
  showRequestInfoTimeout,
  debounce
};
