function range(start, end) {
  console.log(arguments);

  if (start === end) {
    return [start];
  }

  let inc;
  if (arguments.length === 3) {
    inc = arguments[2];
    if (inc === 0) {
      throw "increment cannot be 0"
    }
    if (start < end && inc < 0) {
      throw `start:${start} < end:${end} with negative increment`
    }
    if (start > end && inc > 0) {
      throw `start:${start} > end:${end} with positive increment`
    }
  } else {
    inc = start < end ? 1 : -1;
  }

  let nums = [];
  let i = start;
  while (true) {
    nums.push(i);
    i += inc;
    if (inc < 0 && (i < end)) {
      break;
    }
    if (inc > 0 && (i > end)) {
      break;
    }
  }

  return nums;
}

function sum(nums) {
  return nums.reduce((a, b) => a + b);
}

console.log(range(0, 10));
console.log(range(10, 0));
console.log(range(-5, 5));
console.log(range(5, -5));
console.log(range(-5, -10));
console.log(range(-10, -5));
console.log(range(0, 0));

console.log(range(0, 10, 1));
console.log(range(0, 10, 2));
console.log(range(0, 10, 3));
console.log(range(10, 0, -1));
console.log(range(10, 0, -2));
console.log(range(10, 0, -3));

// these should error out
// console.log(range(0, 10, -1));
// console.log(range(10, 0, 1));
// console.log(range(0, 10, 0));

console.log(sum(range(1, 10)));