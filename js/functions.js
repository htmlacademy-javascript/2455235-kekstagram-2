// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы

function checkStringLenght(string, stringLenght) {
  return string.length <= stringLenght;
}

(checkStringLenght('проверяемая строка', 20));
(checkStringLenght('проверяемая строка', 18));
(checkStringLenght('проверяемая строка', 10));

// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.

function checkPallindrome(string) {
  const changedString = string.replaceAll(' ', '').toUpperCase();
  const reversedString = [...(changedString)].reverse().join('');
  if(changedString === reversedString) {
    return true;
  }
  return false;
}

(checkPallindrome('Лёша на полке клопа нашёл '));
(checkPallindrome('Миша на полке клопа нашёл '));

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число. Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:

const numbers = (data) => {
  if(typeof data === 'number') {
    return Math.abs(data);
  }

  let resultNumber = '';
  const dataArray = [...data];

  for(let i = 0; i < dataArray.length; i++) {
    if (parseInt(dataArray[i], 10) || parseInt(dataArray[i], 10) === 0) {
      resultNumber += dataArray[i];
    }
  }

  if (resultNumber) {
    return parseInt(resultNumber, 10);
  }
  return NaN;
};

(numbers('2023 год'));
(numbers(-42));
(numbers(0));
(numbers('ujl'));
(numbers(''));
