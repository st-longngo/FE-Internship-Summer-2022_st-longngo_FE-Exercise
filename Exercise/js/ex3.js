// 3. Write a JavaScript function to count the occurrence of a substring in a string.
// Input: (string, substring)
// Output: the occurrence of a substring in a string
// Ex: ("The quick brown fox jumps over the lazy dog", 'the') => 2
// Ex: ("The quick brown fox jumps over the lazy dog", 'fox') => 1
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
