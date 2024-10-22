// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы

function checkStringLenght(string, stringLenght) {
  if (string.length <= stringLenght) {
    return true;
  }
  return false;
}

console.log(checkStringLenght('проверяемая строка', 20));
console.log(checkStringLenght('проверяемая строка', 18));
console.log(checkStringLenght('проверяемая строка', 10));

// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.

function checkPallindrome(string) {
  const changedString = string.replaceAll(' ', '').toUpperCase();
  const reversedString = [...(changedString)].reverse().join('');
  if(changedString === reversedString) {
    return true;
  }
  return false;
}

console.log(checkPallindrome('Лёша на полке клопа нашёл '));
console.log(checkPallindrome('Миша на полке клопа нашёл '));
console.log(checkPallindrome('Миша 3а полке /лопа нашёл '));
console.log(checkPallindrome('3'));
console.log(checkPallindrome('3*3'));

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число. Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:

const numbers = (data) => {
  if(data !== !isNaN) {
    return Math.abs(data);
  }
  const numberFromString = +[...data.replaceAll(' ','')].filter((item) => !isNaN(+item)).join('');
  if (numberFromString) {
    return numberFromString;
  }
  return NaN;
};

console.log(numbers('2023 год'));
console.log(numbers('2год023 '));
console.log(numbers(-42));
