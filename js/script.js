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

let operator = "";
let firstNumber = "";
let secondNumber = "";

function operate(operator, firstNumber, secondNumber) {
  const a = +firstNumber;
  const b = +secondNumber;
  let result = "";
  
  switch(operator) {
    case "+":
      result = String(add(a, b));
      break;
    case "-":
      result = String(subtract(a, b));
      break;
    case "*":
      result = String(multiply(a, b));
      break;
    case "/":
      if(b == 0) {
        result = "Math Error";
      } else {
        result = String(divide(a, b));
      }
  }

  // Handling results with long decimals
  if(result != "Math Error") {
    if(result.includes(".")) {
      let decimalPart = result.slice(result.indexOf(".") + 1);
      console.log(`decimalPart: ${decimalPart}`);
      if(decimalPart.length >= 10) {
        if(result.includes("e")) {
          result = String(Number(result).toExponential(5));
        } else {
          result = String(Number(result).toFixed(5));
        }
        console.log(`result: ${result}`);
      }
    } else {
      if(result.length > 10) {
        result = String(Number(result).toExponential(5));
      }
    }  
  }
  console.log(`result: ${result}`);
  return result;
}

function updateFirstNumber(input) {
  if(firstNumber == "0") firstNumber = "";
  firstNumber += input;
  updateDisplay(firstNumber);
  console.log(`firstNumber: ${firstNumber}`);
}

function updateSecondNumber(input) {
  if(secondNumber == "0") secondNumber = "";
  secondNumber += input;
  updateDisplay(secondNumber);
  console.log(`secondNumber: ${secondNumber}`);
}

function updateDisplay(input) {
  document
    .querySelector(".display")
    .textContent = input;
}

function getDisplay() {
  return document
    .querySelector(".display")
    .textContent;
}

function handleDigits(input) {
  if(isMathError()) return;
  
  if(!operator || !firstNumber) {
    updateFirstNumber(input);
    operator = "";
  } else {
    updateSecondNumber(input);
  }
}

function handleSymbols(input) {
  if(isMathError()) return;
  
  if((!operator && !firstNumber && !secondNumber &&
    getDisplay() != "0" && getDisplay() != "Math Error")) {
    firstNumber = getDisplay();
    console.log(`firstNumber: ${firstNumber}`);
    console.log(`operator: ${operator}`);
  }

  if(operator && firstNumber && secondNumber) {
    firstNumber = operate(operator, firstNumber, secondNumber);
    updateDisplay(firstNumber);
    secondNumber = "";
  }

  if(input == "÷") {
    operator = "/";
  } else if(input == "x") {
    operator = "*";
  } else {
    operator = input;
  }
  console.log(`operator: ${operator}`);
}

function handleEquals() {
  if(isMathError()) return;
  if(!secondNumber) return;
  
  updateDisplay(operate(operator, firstNumber, secondNumber));
  operator = "";
  firstNumber = "";
  secondNumber = "";
  console.log(`firstNumber: ${firstNumber}`);
  console.log(`operator: ${operator}`);
  console.log(`secondNumber: ${secondNumber}`);
}

function clearAll() {
  updateDisplay("0");
  operator = "";
  firstNumber = "";
  secondNumber = "";
}

function isMathError() {
  if(getDisplay() == "Math Error") {
    return true;
  } else {
    return false;
  }
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", e => {
    const input = e.target.textContent;

    if(input == "=") return handleEquals();
    if(input == "CA") return clearAll();
    if(input == "CE") return;
    if(input == ".") return;

    if("+-x÷".includes(input)) return handleSymbols(input);
    if("0123456789".includes(input)) return handleDigits(input);
    
  });
});