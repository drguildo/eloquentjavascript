function range(start, end) {
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

console.log("range");
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
console.log(sum(range(10, 1)));

function reverseArray(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.unshift(arr[i]);
  }
  return newArr;
}

console.log("reverseArray");
console.log(reverseArray(range(0, 10)));
console.log(reverseArray(range(0, -10)));
console.log(reverseArray(range(5, -5)));
console.log(reverseArray(range(-5, 5)));
console.log(reverseArray([]));
console.log(reverseArray([0]));
console.log(reverseArray([0, 1]));

function reverseArrayInPlace(arr) {
  if (arr.length < 2) {
    return arr;
  }

  for (let front = 0, back = arr.length - 1; front < back; front++, back--) {
    let tmp = arr[front];
    arr[front] = arr[back];
    arr[back] = tmp;
  }

  return arr;
}

console.log("reverseArrayInPlace");
console.log(reverseArrayInPlace(range(0, 10)));
console.log(reverseArrayInPlace(range(0, -10)));
console.log(reverseArrayInPlace(range(5, -5)));
console.log(reverseArrayInPlace(range(-5, 5)));
console.log(reverseArrayInPlace([]));
console.log(reverseArrayInPlace([0]));
console.log(reverseArrayInPlace([0, 1]));
