// @ts-check

function min(a, b) {
  return a < b ? a : b;
}

console.log(min(0, 0));
console.log(min(-1, 0));
console.log(min(0, -1));
console.log(min(1, 2));
console.log(min(2, 1));

function isEven(n) {
  switch (n) {
  case 0:
    return true;
  case 1:
    return false;
  default:
    return n < 0 ? isEven(n + 2) : isEven(n - 2);
  }
}

for (var n = -5; n <= 5; n++) {
  console.log(`isEven(${n}):`, isEven(n));
}

function countChar(str, char) {
  return str.split("").reduce((acc, val) => val === char ? acc + 1 : acc, 0);
}

function countBs(str) {
  return countChar(str, "B");
}

console.log(countBs(""));
console.log(countBs("B"));
console.log(countBs("A"));
console.log(countBs("AA"));
console.log(countBs("BB"));
console.log(countBs("BBC"));
console.log(countBs("ABABABAB"));

console.log(countChar("kakkerlak", "k"));
