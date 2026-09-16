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

let firstNumber = "";
let secondNumber = "";
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

function updateOperator(sign) {
  if(sign == "÷") {
    operator = "/";
  } else {
    operator = sign;
  }
}

function updateDisplay(text) {
  const display = document.querySelector(".display");
  display.textContent = "";
  display.textContent = text;
}

function updateNumbers(number) {
  if(operator == "") {
    firstNumber += number;
    updateDisplay(firstNumber);
  } else {
    secondNumber += number;
    updateDisplay(secondNumber);
  }
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", e => {
    const button = e.target;
    
    if(firstNumber == "" && secondNumber == "" && button.textContent == "0") {
      return;
    }

    if("+-x÷".includes(button.textContent)) {
      updateOperator(button.textContent);
    }
    
    if("0123456789".includes(button.textContent)) {
      updateNumbers(button.textContent);
    }
  });
});