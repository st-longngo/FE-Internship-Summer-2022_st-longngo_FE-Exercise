// 5. Write a function to get a unique random array number in the specified range.
// Input: (array length, min, max)
// Output: new array
// Ex: (4, 1, 10) => [3, 6, 1, 9]
function uniqueRandom(length, min, max) {
  let arr = [];
  let obj = {};
  for (let i = 0; i < length; i++) {
    let number = Math.floor(min + Math.random() * (max - min));
    while (obj[number]) {
      number = Math.floor(min + Math.random() * (max - min));
    }
    obj[number] = number;
    arr.push(number);
  }
  return arr;
}
