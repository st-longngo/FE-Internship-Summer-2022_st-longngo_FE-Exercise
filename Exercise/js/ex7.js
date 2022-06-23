// 7. Write a function to transform a string like example.
// Input: (string)
// Output: string
// Ex: ('intern FE') => 'Nretni EF'

function reverseString(str) {
  return str
    .split(' ')
    .map((item) => {
      let s = item.split('').reverse().join('');
      return s[0].toUpperCase() + s.slice(1);
    })
    .join(' ');
}
