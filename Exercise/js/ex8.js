// 8
function sumOrdered(arr, num) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % num === 0) sum += arr[i];
  }
  return sum;
}
