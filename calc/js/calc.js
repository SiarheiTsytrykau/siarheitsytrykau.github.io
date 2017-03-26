/*
 * Implementation of the basic functions of the calculator
 */

var calc = {};
calc["+"] = function (a, b) {
  return a + b;
};
calc["-"] = function (a, b) {
  return a - b;
};
calc["*"] = function (a, b) {
  return a * b;
};
calc["/"] = function (a, b) {
  return a / b;
};
calc["intDiv"] = function (a, b) {
  return (a - a % b) / b;
};

for (var operation in calc) {
  console.log('current operation: "' + operation + '"');
  printCalc(operation);
  printCalc(operation, -11, 3);
  printCalc(operation, 11);
  printCalc(operation, 2, "str1");
  printCalc(operation, 2, true);
  printCalc(operation, 2, {});
  printCalc(operation, 2, null);

  printCalc(operation, "str1", "str2");
  printCalc(operation, "str1");
  printCalc(operation, "str1", true);
  printCalc(operation, "str1", {});
  printCalc(operation, "str1", null);

  printCalc(operation, true, false);
  printCalc(operation, true);
  printCalc(operation, true, {});
  printCalc(operation, true, null);
  
  printCalc(operation, {}, {});
  printCalc(operation, {});
  printCalc(operation, {}, null);
  console.log("\n");
}

function printCalc(operation, a, b){
  var result = calc[operation](a, b);
  var resultString = a + " " + operation + " " + b + " = " + result;
  var argumentType = getType(a) + " " + operation + " " + getType(b) + " = " + getType(result);
  console.log(argumentType + ":  " + resultString);
}
function getType(value){
  return value === null ? null : typeof value;
}
