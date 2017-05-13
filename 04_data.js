// The sum of a range

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

// Reversing an array

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

// A list

function prepend(value, list) {
  return {
    "value": value,
    "rest": list
  }
}

function nth(list, n) {
  while (n > 0 && list) {
    list = list.rest;
    n--;
  }
  return list ? list.value : undefined;
}

function arrayToList(arr) {
  let list = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    list = prepend(arr[i], list);
  }
  return list;
}

function listToArray(list) {
  let arr = [];
  let value, i = 0;
  while (value = nth(list, i)) {
    arr.push(value);
    i++;
  }
  return arr;
}

let list = {
  "value": Math.random(),
  "rest": null
};
for (let i = 0; i < 10; i++) {
  list = prepend(Math.random(), list);
}
console.log(list);

console.log(nth(list, 2));
console.log(nth({}, 2)); // → undefined

console.log(arrayToList([]));
console.log(arrayToList([0]));
console.log(arrayToList([0, 1]));
console.log(arrayToList([0, 1, 2]));
console.log(arrayToList([0, 1, 2, 3]));

console.log(listToArray(list));
console.log(listToArray({
  "value": Math.random(),
  "rest": null
}));

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
