// 10

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
