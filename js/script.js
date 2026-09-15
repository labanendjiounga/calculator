function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let firstNumber = 0;
let secondNumber = 0;
let operator = "";

function operate(operator, a, b) {
  let result = 0;

  switch(operator) {
    case "+":
      result = add(a,b);
      break;
    case "-":
      result = subtract(a,b);
      break;
    case "*":
      result = multiply(a,b);
      break;
    case "/":
      result = divide(a,b);
      break;
  }
  
  return result;
}