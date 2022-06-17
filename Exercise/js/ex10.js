// 10. Write a function to find the new time after a specified time from the given time.
// Input: (givenTime string, period number(s))
// Output: newTime string
// Ex: ('12:30:29', 600) => '12:40:29'
// Ex: ('23:30:29', 6000) => '01:10:29'

function findTime(time, num) {
  let arr = time.split(":");
  let [h, m, s] = arr;
  h = (+h + Math.floor((+m + Math.floor((num + +s) / 60)) / 60)) % 24;
  m = (+m + Math.floor((num + +s) / 60)) % 60;
  s = (+s + (num % 60)) % 60;
  let str = `${Math.floor(h / 10) == 0 ? `0${h}` : h}:${
    Math.floor(m / 10) == 0 ? `0${m}` : m
  }:${Math.floor(s / 10) == 0 ? `0${s}` : s}`;
  return str;
}
