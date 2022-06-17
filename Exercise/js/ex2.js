// 2. Write a JavaScript function to repeat a string a specified times.
// Input: (string, repeat times)
// Output: the new string
// Ex: ("FE", 4) => 'FEFEFEFE'
function reapeatString(string, time) {
  let str = "";
  for (let i = 0; i < time; i++) {
    str += string;
  }
  return str;
}
