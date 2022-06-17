// 3
function countString(str, subStr) {
  let count = 0;
  str = str.toLowerCase();
  subStr = subStr.toLowerCase();
  while (str.includes(subStr)) {
    let idx = str.indexOf(subStr);
    str = str.substr(0, idx) + str.substr(idx + subStr.length, str.length);
    count++;
  }
  return count;
}
