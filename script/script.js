let calculator = {
    displayValue: "0",
    firstNum: null,
    secondNumInput: false,
    operator: null,
    lastEqual: false,
    decimal: false,
};

function add(firstNum, secondNum) {
    return (firstNum + secondNum);
}

function subtract(firstNum, secondNum) {
    return (firstNum - secondNum);
}

function multiply(firstNum, secondNum) {
    return (firstNum * secondNum);
}

function divide(firstNum, secondNum) {
    if (secondNum === 0) {
        const display = document.querySelector('.value');
        display.textContent = "Mission impossible"
    } else {
        return (firstNum / secondNum);
    }
}

function operate(firstNum, secondNum, operator) {
    if (operator === "+") {
        return add(firstNum, secondNum);
    } else if (operator === "-") {
        return subtract(firstNum, secondNum);
    } else if (operator === "/") {
        return divide(firstNum, secondNum);
    } else if (operator === "*") {
        return multiply(firstNum, secondNum);
    }
}

const operations = document.querySelector('.operations-grid');
operations.addEventListener('click', (event) => {
        const { target } = event;
        const { value } = target;

            //if clicked element is not a button, exits
            if (!target.matches('button')) {
                return;
            }

            switch (value) {
                case '+':
                case '-':
                case '*':
                case '/':
                    operator(value);
                    break;
                case '=':
                    equals();
                    break;
                case 'clear':
                    calculator = {
                        displayValue: "0",
                        firstNum: null,
                        secondNumInput: false,
                        operator: null,
                    }
                    valueDisplay();
                    break;
                case '⌫':
                    backspace();
                    break;
                case '.':
                    if (calculator.decimal === true) {
                        break;
                    } else {
                        valueInput(value);
                        calculator.decimal = true;
                        break;
                    }
                default:
                    valueInput(value);
            }
        });

// keyboard support for the calculator
window.addEventListener('keydown', (event) => {
    const value = event.key;
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const allowedKeys = ['+', '-', '*', '/', '.', '=', 'Enter', 'Delete', 'Backspace'].concat(numbers);
    if (allowedKeys.includes(value) === false) {
        return;
    } else {
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                operator(value);
                break;
            case '=':
            case 'Enter':
                equals();
                break;
            case 'Delete':
                calculator = {
                    displayValue: "0",
                    firstNum: null,
                    secondNumInput: false,
                    operator: null,
                }
                valueDisplay();
                break;
            case 'Backspace':
                backspace();
                break;
            case '.':
                if (calculator.decimal === true) {
                    break;
                } else {
                    valueInput(value);
                    calculator.decimal = true;
                    break;
                }
            default:
                valueInput(value);
        }
    }
});

//if directly input new value after operation, clears the calculator object to start a new calculation
//inputs value to calculator and calls a function to display the value
function valueInput(input) {
    if (calculator.lastEqual === true && calculator.operator === null) {
        calculator.displayValue = input;
        calculator.firstNum = null;
        calculator.secondNumInput = false;
        calculator.operator = null;
        calculator.lastEqual = false;
        calculator.decimal = false;
        valueDisplay();
    } else {
        const { displayValue } = calculator;
        calculator.displayValue = displayValue === '0' ? input : displayValue + input;
        valueDisplay();
    }
}

// displays the value on the display, displays maximum 13 digits
function valueDisplay() {
    const display = document.querySelector('.value');
    if (calculator.displayValue > '99999999999') {
        display.textContent = '99999999999';
    } else {
        display.textContent = parseFloat(calculator.displayValue);
    }
}

// if two numbers have been input, calls operate function for calculation
function operator(value) {
    if (calculator.secondNumInput === false) {
        calculator.operator = value;
        calculator.firstNum = calculator.displayValue;
        calculator.displayValue = '0';
        calculator.secondNumInput = true;
        calculator.decimal = false;
        // if operator pressed after equals
    } else if (calculator.secondNumInput === true && calculator.displayValue === '0') {
        calculator.displayValue = calculator.firstNum;
        valueDisplay();
        calculator.displayValue = '0';
        calculator.operator = value;
        calculator.decimal = false;
    } else {
        calculator.displayValue = operate(
            parseFloat(calculator.firstNum), parseFloat(calculator.displayValue), calculator.operator);
        calculator.displayValue = calculator.displayValue.toPrecision(4).toString();   
        valueDisplay();
        calculator.firstNum = calculator.displayValue;
        calculator.displayValue = '0';
        calculator.operator = value;
        calculator.decimal = false;
    }
}

//calculates the operation if both of the numbers have been input
function equals() {
    if (calculator.operator != null) {
        calculator.displayValue = operate(
            parseFloat(calculator.firstNum), parseFloat(calculator.displayValue), calculator.operator);
        calculator.displayValue = calculator.displayValue.toPrecision(4).toString();
        valueDisplay();
        calculator.firstNum = calculator.displayValue;
        calculator.displayValue = '0';
        calculator.operator = null;
        calculator.lastEqual = true;
        calculator.decimal = false;
        return;
    }
}

// deletes the last input value
function backspace() {
    const display = document.querySelector('.value');
    calculator.displayValue = calculator.displayValue.substring(
        0, calculator.displayValue.length - 1);
    display.textContent = calculator.displayValue;
    valueDisplay();
}

