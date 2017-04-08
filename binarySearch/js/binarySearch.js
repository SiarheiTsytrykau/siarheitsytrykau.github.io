/* Binary search task */

var array = [-10,-5,-1,0,1,5,6,7,8,9];

console.log("Simple binary search:");
array.forEach(searchLog, binarySearch);
console.log("Recursion binary search:");
array.forEach(searchLog, binarySearchRecurs);
console.log("The missing element is less than the minimum: ", binarySearch(array, -1000), " and with recursion: ", binarySearchRecurs(array, -1000));
console.log("The missing element is more than the maximum: ", binarySearch(array, 1000), " and with recursion: ", binarySearchRecurs(array, 1000));
console.log("Empty array: ", binarySearch([],3), " and with recursion: ", binarySearchRecurs([],3));
console.log("Not array: ", binarySearch({},3), " and with recursion: ", binarySearchRecurs({},3));

function searchLog(element,index,array){
  console.log("array: ", array, " search number = ", element, " result => " + this(array,element));
}

function binarySearch(array, searchNumber) {
  var result = -1;
  if(!Array.isArray(array)) {
    return result;
  }
  var low = 0;
  var high = array.length;
  while (low < high) {
    var middle = low + (high - low >> 1);
    if (searchNumber === array[middle]) {
      return middle;
    }
    if (searchNumber < array[middle]) {
      high = middle;
    } else {
      low = middle + 1;
    }
  }
  return result;
}

function binarySearchRecurs(array, searchNumber) {
  var low = arguments[2] || 0;
  var high = arguments[3] || array.length;
  var middle = low + (high - low >> 1);
  if(!Array.isArray(array)) return -1;
  if(searchNumber === array[middle]) return middle;
  if(searchNumber < array[middle]) {
    high = middle;
  } else {
    low = middle + 1;
  }
  if(low >= high) {
    return -1;
  } else {
    return binarySearchRecurs(array, searchNumber, low, high);
  }
}
