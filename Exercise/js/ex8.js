// 8. Write a function that calculates the sum of the ordered elements that are divisible by a specified number in the array.
// Input: (array, number)
// Output: number
// Ex: ([1, 2, 3, 4, 5, 6, 7], 2) => 12
// Ex: ([1, 2, 3, 4, 5, 6, 7], 3) => 9

function sumOrdered(arr, num) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % num === 0) sum += arr[i];
  }
  return sum;
}
