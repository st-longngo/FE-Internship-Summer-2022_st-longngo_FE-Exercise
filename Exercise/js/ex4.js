// 4. Write a JavaScript function to truncate a string to a certain number of words.
// Input: (string, number)
// Output: new string
// Ex: ('The quick brown fox jumps over the lazy dog', 4) => "The quick brown fox"
function truncateString(str, num) {
  return str.split(' ').splice(0, num).join(' ');
}
