// @ts-check

let fmt = (n) => Math.round(n * 10) / 10;

// Flattening

var arrays = [
  [1, 2, 3],
  [4, 5],
  [6]
];

function flattenArray(arr) {
  return arr.reduce((flatArray, array) => flatArray.concat(array), []);
}

console.log(flattenArray(arrays)); // → [1, 2, 3, 4, 5, 6]
console.log(flattenArray([])); // → []
console.log(flattenArray([
  [1]
])); // → [1]
console.log(flattenArray([1])); // → [1]
console.log(flattenArray([1, 2])); // → [1, 2]

// Mother-child age difference

// @ts-ignore
const ancestry = JSON.parse(require("./ancestry.js"));

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

var byName = {};
ancestry.forEach(function (person) {
  byName[person.name] = person;
});

function averageMotherChildAgeDifference() {
  let ageDifferences = [];
  ancestry.forEach(person => {
    if (byName[person.mother]) {
      ageDifferences.push(person.born - byName[person.mother].born);
    }
  });
  return Math.round(average(ageDifferences) * 10) / 10;
}
console.log(averageMotherChildAgeDifference());; // → 31.2

// Historical life expectancy

function lifeExpectancyByCentury() {
  let expectancies = {};
  ancestry.forEach(p => {
    let century = Math.ceil(p.died / 100);
    let age = p.died - p.born;
    if (expectancies[century]) {
      expectancies[century].push(age);
    } else {
      expectancies[century] = [age];
    }
  });
  for (let k in expectancies) {
    console.log(`${k}:`, Math.round(average(expectancies[k]) * 10) / 10);
  }
}
lifeExpectancyByCentury();
// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94

function groupBy(arr, f) {
  let grouped = {};
  arr.forEach(elem => {
    let key = f(elem);
    if (grouped[key]) {
      grouped[key].push(elem);
    } else {
      grouped[key] = [elem];
    }
  });
  return grouped;
}

function lifeExpectancyByCenturyAlt() {
  let grouped = groupBy(ancestry, p => Math.ceil(p.died / 100));
  for (let k in grouped) {
    console.log(`${k}:`, fmt(average(grouped[k].map(p => p.died - p.born))));
  }
}
lifeExpectancyByCenturyAlt();

// Every and then some

function every(arr, f) {
  for (var i = 0; i < arr.length; i++) {
    if (!f(arr[i])) {
      return false;
    }
  }
  return true;
}

function some(arr, f) {
  return arr.find(e => f(e)) !== undefined;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
