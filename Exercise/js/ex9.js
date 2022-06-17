// 9
function maximun2Sum(arr) {
  if (arr.length < 2) return 0;
  let max = arr[0] + arr[1];
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] + arr[i + 1] > max) max = arr[i] + arr[i + 1];
  }
  return max;
}
