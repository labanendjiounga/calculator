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
  
  if(firstNumber == "." || secondNumber == ".") {
    return result = "Math Error"; // Can't operate if one of the operands is only a dot.
  }

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

  if(result != "Math Error") {
    if(result.includes(".")) {
      result = roundResultsWithLongDecimals(result);
    } else {
      if(result.length > 12) {
        result = roundLongInteger(result);
      }
    }
  }

  return result;
}

function getIntegerAndDecimalParts(string) {
  const integerPart = string.slice(0, string.indexOf("."));
  const decimalPart = string.slice(string.indexOf(".") + 1);
  
  return [integerPart, decimalPart];
}

function roundResultsWithLongDecimals(result) {
  let integerPart = "";
  let decimalPart = "";

  [integerPart, decimalPart] = getIntegerAndDecimalParts(result);

  if(result.includes("e")) {
    if(decimalPart.length > 7) {
      return String(Number(result).toExponential(5));
    }
  }

  let roundedResult = "";

  if(decimalPart.length > 7) {
    roundedResult = String(Number(result).toFixed(5));
    
    if(integerPart.length > 7) {
      roundedResult = roundLongInteger(roundedResult);
    }

    return roundedResult;
  }

  if(integerPart.length > 7) {
    roundedResult = roundLongInteger(result);
    
    if(decimalPart.length > 7) {
      roundedResult = String(Number(result).toFixed(5));
    }

    return roundedResult;
  }
  
  return result;
}

function roundLongInteger(result) {
  return String(Number(result).toExponential(5));
}

function updateFirstNumber(input) {
  if(!firstNumber && input == ".") {
    firstNumber = `0${input}`;
    updateDisplay(firstNumber);
  }
  
  if(firstNumber == "0" && input != ".") firstNumber = "";
  if(firstNumber.includes(".") && input == "." || firstNumber == "0." && input == ".") return;
  
  firstNumber += input;
  updateDisplay(firstNumber);
}

function updateSecondNumber(input) {
  if(!secondNumber && input == ".") {
    secondNumber = `0${input}`;
    updateDisplay(`${firstNumber} ${operator} ${secondNumber}`);
  }
  
  if(secondNumber == "0" && input != ".") secondNumber = "";
  if(secondNumber.includes(".") && input == "." || secondNumber == "0." && input == ".") return;
  
  secondNumber += input;
  updateDisplay(`${firstNumber} ${operator} ${secondNumber}`);
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

function handleDigitsAndDot(input) {
  if(isMathError()) return;
  
  if(!operator) {
    updateFirstNumber(input);
  } else {
    updateSecondNumber(input);
  }
}

function handleOperators(input) {
  if(isMathError()) return;
  if(firstNumber == "0." || secondNumber == "0.") return;
  
  if(!operator && !firstNumber && !secondNumber && getDisplay() != "Math Error") {
    // Then the current display is the previous operation's result.
    // Affect it to firstNumber.
    // This gives the user the opportunity to perform a new operation, if they want to,
    // using this value as firstNumber.
    // See the comment inside the handleCE function.
    firstNumber = getDisplay();
  }

  if(operator && firstNumber && secondNumber) {
    let result = operate(operator, firstNumber, secondNumber);
    
    if(result == "Math Error") return updateDisplay(result);
    
    if(result.includes(".")) {
      result = roundResultsWithLongDecimals(result);
    } else {
      if(result.length > 12) {
        result = roundLongInteger(result);
      }
    }
    
    firstNumber = result;
    updateDisplay(firstNumber);
    
    // Operator is currently assigned.
    // So if secondNumber isn't reset here and now,
    // then the next time the user hits a digit,
    // that digits will be added to the end of the previous secondNumber's value.
    // Yet we don't want that. You do want secondNumber to start fresh with zero digit inside.
    secondNumber = "";
  }

  operator = input;
  updateDisplay(`${firstNumber} ${operator}`);
}

function handleEquals() {
  if(isMathError()) return;
  if(!secondNumber) return;
  
  updateDisplay(operate(operator, firstNumber, secondNumber));

  operator = "";
  firstNumber = "";
  secondNumber = "";
}

function handleAC() {
  updateDisplay("0");
  operator = "";
  firstNumber = "";
  secondNumber = "";
}

function handleCE(input) {
  if(isMathError()) return;
  
  if(!operator && !firstNumber && !secondNumber && getDisplay() != "Math Error") {
    // Then the current display is the previous operation's result.
    // So it mustn't be altered.
    // Instead, AC or hits an operator to start a new operation
    // with the current display as the first number value.
    // See the comment inside the handleOperators function.
    return;
  }

  if(firstNumber && !operator && !secondNumber) {
    const array = firstNumber.split("");
    array.splice(-1, 1);
    firstNumber = array.join("");
    if(!firstNumber) return updateDisplay("0"); // The display shouldn't be empty.
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
    if(input == "AC") return handleAC();
    if(input == "CE") return handleCE(input);

    if("+-x÷".includes(input)) return handleOperators(input);
    if("0123456789.".includes(input)) return handleDigitsAndDot(input); 
  });
});