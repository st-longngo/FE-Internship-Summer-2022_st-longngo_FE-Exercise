// 5. Write a function to get a unique random array number in the specified range.
// Input: (array length, min, max)
// Output: new array
// Ex: (4, 1, 10) => [3, 6, 1, 9]
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
