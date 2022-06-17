// 5

function uniqueRandom(length, min, max) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let number = Math.floor(min + Math.random() * (max - min));
    while (arr.indexOf(number) != -1) {
      number = Math.floor(min + Math.random() * (max - min));
    }
    arr.push(number);
  }
  return arr;
}
