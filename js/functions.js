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

/*Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.*/

const getMinuts = (time) => {
  const arrayTime = time.split(':');
  return parseInt(arrayTime[0], 10) * 60 + parseInt(arrayTime[1], 10);
};

const getResult = (timeWorkBegining, timeWorkEnding, timeMeetingBigining, durationMeeting) => getMinuts(timeWorkBegining) <= getMinuts(timeMeetingBigining) &&
    getMinuts(timeWorkEnding) >= getMinuts(timeMeetingBigining) + durationMeeting;

// eslint-disable-next-line no-console
console.log(getResult('08:00', '17:30', '14:00', 90));
// eslint-disable-next-line no-console
console.log(getResult('08:00', '14:30', '14:00', 90));
