"use strict";

var typeArray = ["string", true, 1, -1.2, null, undefined, {}, [], [1,2], function(){}];
typeArray.forEach(logArrayElements, isArray1);
typeArray.forEach(logArrayElements, isArray2);
typeArray.forEach(logArrayElements, isArray3);

console.log("\n");
[[], [5], [1,5], [1,10,2], [0,10,3]].forEach(function(element) {
  console.log(this.name, " with arguments ", element.join(), " => ", this.apply(this, element));
}, range);

console.log("\n");
var testArray = [0, 1, true, false, "asdf", "", {}, [], null, undefined];
console.log(testArray, " true elements: ", compact(testArray));
console.log(testArray, " true elements: ", testArray.filter(onlyTrue));

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
  console.log(this.name, " with argument ", element, " => ", this(element));
}

/* isArray function return true value if an argument has the Array type */
function isArray1(obj) {
  return Array.isArray(obj);
}
function isArray2(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object Array]";
}
function isArray3(obj) {
  return (obj) instanceof Array;
}

/* range function return new array instance */
function range(from, to, step) {
  step = step || 1;
  from = from || 0;
  if(!to) {
    to = from;
    from = 0;
  }
  var result = [];
  for(from; from < to; from += step) {
    result.push(from);
  }
  return result;
}

/* Return a new array with true elements */
function compact(array) {
  if(!Array.isArray(array)) {
    return;
  }
  var result = [];
  for(var i = 0; i < array.length; i++) {
    if(array[i]) result.push(array[i]);
  }
  return result;
}
/* function is used in the Array.filter()
Return a new array with true elements */
function onlyTrue(value) {
  return !!value;
}

/* returns the sum of array elements */
function sum(array){
  var result = 0;
  for(var i = 0; i < array.length; i++) {
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
  var startPos = deleteCount * -1;
  array.splice(startPos, deleteCount);
  return array;
}

/* return last element from array */
function lastElement(array) {
  return array[array.length - 1];
}

/* returns a new array with unique elements */
function unique(array) {
  var result = [];
  for(var i = 0; i < array.length; i++) {
    if(!result.includes(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}
