// 9. Write a function to find the maximum sum of 2 consecutive elements in the array.
// Input: (array)
// Output: number
// Ex: ([1, 2, 3, 4, 5, 6, 7]) => 13
// Ex: ([1, 2, 3, 7, 5, 6, 4]) => 12
function maximun2Sum(arr) {
  if (arr.length < 2) return 0;
  let max = arr[0] + arr[1];
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] + arr[i + 1] > max) max = arr[i] + arr[i + 1];
  }
  return max;
}
