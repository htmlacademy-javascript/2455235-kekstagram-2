const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getIndexIncrement () {
  let count = 0;
  return function () {
    return ++count;
  };
}

const findTemplate = (id) =>{
  const template = document.getElementById(id);
  if(!template) {
    throw new Error(`Template not found: #${id}`);
  }
  if(!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not template: #${id}`);
  }
  return template.content.firstElementChild;
};

export {getRandomInteger, getIndexIncrement, findTemplate};

