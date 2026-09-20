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
    case "x":
      result = String(multiply(a, b));
      break;
    case "÷":
      if(b == 0) {
        result = "Math Error";
      } else {
        result = String(divide(a, b));
      }
  }
  console.log(`result1: ${result}`);

  // Handling results with long decimals
  if(result != "Math Error") {
    if(result.includes(".")) {
      const wholes = result.slice(0, result.indexOf("."));
      const decimals = result.slice(result.indexOf(".") + 1);

      console.log(`result2: ${result}`);
      console.log(`wholes: ${wholes}`);
      console.log(`decimals: ${decimals}`);

      if(result.includes("e")) {
        if(decimals.length > 10) {
          result = String(Number(result).toExponential(5));
          return result;
        }
      } 
      if(wholes.length == 1 && decimals.length > 17) {
        result = String(Number(result).toFixed(1));
      }
      if(wholes.length > 17 && decimals.length == 1) {
        result = String(Number(result).toExponential(5));
      }
    } else {
      if(result.length > 19) {
        result = String(Number(result).toExponential(5));
      }
    } 
  }

  return result;
}

function updateFirstNumber(input) {
  if(firstNumber == "0" && input != ".") firstNumber = "";
  if(firstNumber.includes(".") && input == ".") return;
  firstNumber += input;
  updateDisplay(firstNumber);
  console.log(`firstNumber: ${firstNumber}`);
}

function updateSecondNumber(input) {
  if(secondNumber == "0" && input != ".") secondNumber = "";
  if(secondNumber.includes(".") && input == ".") return;
  secondNumber += input;
  updateDisplay(`${firstNumber} ${operator} ${secondNumber}`);
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
  if(getDisplay() == "") return;
  
  if((!operator && !firstNumber && !secondNumber &&
    getDisplay() != "0" || getDisplay() == "0" && getDisplay() != "Math Error")) {
    firstNumber = getDisplay();
    console.log(`getDisplay: ${getDisplay()}`);
    console.log(`firstNumber: ${firstNumber}`);
    console.log(`operator: ${operator}`);
  }

  if(operator && firstNumber && secondNumber) {
    firstNumber = operate(operator, firstNumber, secondNumber);
    updateDisplay(`${firstNumber}`);
    secondNumber = "";
  }

  operator = input;
  console.log(`operator: ${operator}`);
  console.log(`firstNumber: ${firstNumber}`);
  updateDisplay(`${firstNumber} ${operator}`);
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
  updateDisplay("");
  operator = "";
  firstNumber = "";
  secondNumber = "";
}

function handleBackSpace(input) {
  if(isMathError()) return;
  
  if(getDisplay() == "0") {
    updateDisplay("");
  }

  if(getDisplay() && !operator && !firstNumber && !secondNumber) {
    const array = getDisplay().split("");
    array.splice(-1, 1);
    updateDisplay(array.join(""));
  }

  if(firstNumber && !operator && !secondNumber) {
    const array = firstNumber.split("");
    array.splice(-1, 1);
    firstNumber = array.join("");
    console.log(firstNumber);
    updateDisplay(firstNumber);
  }

  if(firstNumber && operator && !secondNumber) {
    operator = ""
    updateDisplay(firstNumber);
  }

  if(firstNumber && operator && secondNumber) {
    const array = secondNumber.split("");
    array.splice(-1, 1);
    secondNumber = array.join("");
    console.log(secondNumber);
    updateDisplay(`${firstNumber} ${operator} ${secondNumber}`);
  }
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
    if(input == "AC") return clearAll();
    if(input == "CE") return handleBackSpace(input);

    if("+-x÷".includes(input)) return handleSymbols(input);
    if(".0123456789".includes(input)) return handleDigits(input);
    
  });
});