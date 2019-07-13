//DOM nodes
const screen = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const enter = document.querySelector("#enter");
const clearButton = document.querySelector("#clear");
const firstOp = document.querySelector("#firstOperand");
const currentOp = document.querySelector("#currentOperator");
const secondOp = document.querySelector("#secondOperand");

//Evaluation variables
let displayValue = "";
let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let resultOnScreen = false;

//Event listeners
//Numbers
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        displayValue += number.textContent;
        if (currentOperator == "") { 
            firstOperand += number.textContent;
            //firstOp.textContent = firstOperand;
        }
        else {
            secondOperand += number.textContent;
            //secondOp.textContent = secondOperand;
        }
        updateDisplay();
    });
 });

 //Clear button
 clearButton.addEventListener("click", () => { 
     clear();
 });

 //Operators
 operators.forEach((operator) => {
     operator.addEventListener("click", () => {
         if (resultOnScreen == true) {
             currentOperator = operator.textContent;
             //currentOp.textContent = currentOperator;
             clearDisplay();
         }
         else if (!(currentOperator == "")) {
             if (secondOperand == "" || firstOperand == "") {
                 clear();
                 displayValue = "Error: operand missing";
                 updateDisplay();
             }
             else {
                 displayValue = operate(currentOperator, firstOperand, secondOperand);
                 updateDisplay();
             }
         }
         else {
             currentOperator = operator.textContent;
             //currentOp.textContent = currentOperator;
             clearDisplay();
         }
     });
 });

 //Equals button
 enter.addEventListener("click", () => {
    if (currentOperator == "" || firstOperand == "") {
        displayValue = "Error: Operator or operand missing"
    }
    else if (!(firstOperand == "") && secondOperand == "") {
        displayValue = firstOperand;
    }
    else {
        displayValue = operate(currentOperator, firstOperand, secondOperand);
        updateDisplay();
        currentOperator = "";
        firstOperand = displayValue;
        //firstOp.textContent = displayValue;
        currentOp.textContent = currentOperator;
        //secondOp.textContent = "";
        secondOperand = "";
        resultOnScreen = true;
    }
});

//Function definitions
const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (operator, a, b) => {
    let aInt = Number.parseInt(a);
    let bInt = Number.parseInt(b);

    if (operator == "+") {
        return add(aInt, bInt);
    }
    else if (operator == "-") {
        return subtract(aInt, bInt);
    }
    else if (operator == "*") {
        return multiply(aInt, bInt);
    }
    else if (operator == "/") {
        return divide(aInt, bInt);
    }
    else {
        return "ERROR: something went wrong";
    }
}

const clear = () => {
    displayValue = "";
    firstOperand = "";
    secondOperand = "";
    currentOperator = "";
    //firstOp.textContent = "";
    //secondOp.textContent = "";
    //currentOp.textContent = "";
};

const updateDisplay = () => {
    screen.textContent = displayValue;
};

const clearDisplay = () => {
    displayValue = "";
    screen.textContent = displayValue;
}