"use strict";

var typeArray = ["string", true, 1, -1.2, null, undefined, {}, [], [1, 2], function(){}];
typeArray.forEach(logArrayElements, isArray1);
typeArray.forEach(logArrayElements, isArray2);

console.log("\n");
[
  [10], [1, 10], [1, 10, 3], [1, 10, 3, 8, 20], [10, null, 3], [10, null], [-2, -5], [-5, -2], [-5, -2, 2],
  [-5, -2, -2], [-5, null, 2], [-5, null, -2], [-10, -20, -5], [-10, -20, -5, 20], [-20, -10, -5]
].forEach(
  function(element) {
    console.log(
      this.name,
      " with arguments ", 
      element.join(),
      " => ", 
      this.apply(this, element)
    );},
  range
);

console.log("\n");
var testArray = [0, 1, true, false, "asdf", "", {}, [], null, undefined];
console.log(testArray, " true elements: ", compact(testArray));
console.log(testArray, " true elements: ", compact1(testArray));

console.log("\n");
var numberArray = [1, -1, true, false, , "", null];
console.log(numberArray, " sum elements: ", sum(numberArray));
console.log(numberArray, " sum elements: ", sumReduce(numberArray));

console.log("\n");
console.log("initial array: ", testArray.concat(testArray) );
console.log("returns a new array with unique elements", unique(testArray));
console.log("delete one last elements from array", excludeLast(testArray));
console.log("delete 4 last elements from array", excludeLast(testArray, 4));
console.log("return last element from array: ", lastElement(testArray));

function logArrayElements(element) {
  console.log(
    this.name, 
    " with argument ",
    element, " => ", 
    this(element)
  );
}

/* isArray function return true value if an argument has the Array type */
function isArray1(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}
function isArray2(obj) {
  return (obj) instanceof Array;
}

/* range function return new array instance */
function range(from, to, step) {
  step = step || 1;
  from = from || 0;
  if (!to) {
    to = from;
    from = 0;
  }
  var length = Math.ceil((to - from) / step);
  var result = [];
  for (var i = 0; i < length; i++) {
    result.push(from + step * i);
  }
  return result;
}

/* Return a new array with true elements */
function compact(array) {
  if(!isArray1(array)) {
    return;
  }
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i]) result.push(array[i]);
  }
  return result;
}
function compact1(array) {
  return array.filter(
    function (element) {
      return element;
    }
  );
}

/* returns the sum of array elements */
function sum(array){
  var result = 0;
  for (var i = 0; i < array.length; i++) {
    result += +array[i];
  }
  return result;
}
function sumReduce(array){
  return array.reduce(function(previousValue, currentValue){
    return +previousValue + +currentValue;
  }, 0);
}

/* delete last elements from array */
function excludeLast(array, deleteCount) {
  deleteCount = deleteCount || 1 ;
  return array.slice(0, array.length - deleteCount);
}

/* return last element from array */
function lastElement(array) {
  return array[array.length - 1];
}

/* returns a new array with unique elements */
function unique(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}
