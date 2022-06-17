// 4. Write a JavaScript function to truncate a string to a certain number of words. 
// Input: (string, number)
// Output: new string
// Ex: ('The quick brown fox jumps over the lazy dog', 4) => "The quick brown fox"
function truncateString(str, num) {
  let result = [];
  let arr = [];
  let s = "";
  str = str.trim();
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      if (s != "") arr.push(s);
      s = "";
    } else {
      s += str[i];
    }
  }
  if (arr.length < num) return str;
  for (let i = 0; i < num; i++) {
    result.push(arr[i]);
  }
  return result.join(" ");
}
