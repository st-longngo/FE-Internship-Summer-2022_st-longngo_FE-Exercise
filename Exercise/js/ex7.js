// 7
function reverseString(str) {
  return str
    .split(" ")
    .map(function (item) {
      let s = item.split("").reverse().join("");
      return s[0].toUpperCase() + s.slice(1);
    })
    .join(" ");
}
