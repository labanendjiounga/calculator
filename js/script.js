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
  const a = Number(firstNumber);
  const b = Number(secondNumber);
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

  return result;
}

function storeNumbers(userInput) {
  const display = document.querySelector(".display");
  if(display.textContent == "Math Error") return;
  
  if(!operator) {
    if(firstNumber == "0") firstNumber = "";
    firstNumber += userInput;
    updateDisplay(firstNumber);
    console.log(`firstNumber: ${firstNumber}`);
  } else {
    if(secondNumber == "0") secondNumber = "";
    secondNumber += userInput;
    updateDisplay(secondNumber);
    console.log(`secondNumber: ${secondNumber}`);
  }
}

function updateDisplay(text) {
  document
    .querySelector(".display").textContent = ""
    .textContent = text;
}

function handleOperators(userInput) {
  if(firstNumber && secondNumber) {
    const result = calculate();
    if(result == "Math Error") return;
    
    firstNumber = result
    console.log(`firstNumber: ${firstNumber}`);
    secondNumber = "";
  }

  if(userInput == "÷") {
    operator = "/";
  } else if(userInput == "x") {
    operator = "*";
  } else {
    operator = userInput;
  }
  console.log(`operator: ${operator}`)
}

function calculate() {
  if(!firstNumber || !secondNumber) return;
  
  const result = operate(operator, firstNumber, secondNumber);
  updateDisplay(result);
  console.log(`result: ${result}`);
  return result;
}

function clearAll() {
  document
    .querySelector(".display")
    .textContent = "0";
  
  operator = "";
  firstNumber = "";
  secondNumber = "";
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", e => {
    const userInput = e.target.textContent;
    
    if(userInput == "CA") return clearAll();
    if(userInput == "=") return calculate();
    
    if("+-x÷".includes(userInput)) {
      return handleOperators(userInput);
    }
    
    return storeNumbers(userInput);
  });
});