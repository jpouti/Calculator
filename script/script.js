let calculator = {
    displayValue: "0",
    firstNum: null,
    secondNumInput: false,
    operator: null,
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
        // dividing by 0 is undefined
        return NaN;
    } else {
        return (firstNum / secondNum);
    }
}

function operate(firstNum, secondNum, operator) {
    if (operator === "+") {
        return add(firstNum, secondNum);
    } else if (operator === "-") {
        return subtract(firstNum, secondNum);
    } else if (operator === "÷") {
        return divide(firstNum, secondNum);
    } else if (operator === "×") {
        return multiply(firstNum, secondNum);
    }
}

const operations = document.querySelector('.operations-grid');
operations.addEventListener('click', (event) => {
    const { target } = event;

    //if clicked element is not a button, exits
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        operator(target.value);
        return;
    }

    if (target.classList.contains('equal')) {
        calculator.displayValue = operate(
            parseInt(calculator.firstNum), parseInt(calculator.displayValue), calculator.operator);
        valueDisplay();
        return;
    }

    //clears the calculator object
    if (target.classList.contains('clear')) {
        calculator = {
            displayValue: "0",
            firstNum: null,
            secondNumInput: false,
            operator: null,
        }
        valueDisplay();
        return;
    }

    if (target.classList.contains('backspace')) {
        backspace();
        return;
    }

// !! decimal function to be created
    if (target.classList.contains('decimal')) {
        console.log(target.value, 'decimal');
        return;
    }
    valueInput(target.value);

})

//inputs value to calculator and calls a function to display the value
function valueInput(input) {
    const { displayValue } = calculator;
    calculator.displayValue = displayValue === '0' ? input : displayValue + input;
    valueDisplay();
}

// displays the value on the display
function valueDisplay() {
    const display = document.querySelector('.value');
    display.textContent = calculator.displayValue;
}

// if two numbers have been input, calls operate function for calculation
function operator(value) {
    if (calculator.secondNumInput === false) {
        calculator.operator = value;
        calculator.firstNum = calculator.displayValue;
        calculator.displayValue = '0';
        calculator.secondNumInput = true;
    } else {
        calculator.displayValue = operate(
            parseInt(calculator.firstNum), parseInt(calculator.displayValue), calculator.operator);
        valueDisplay();
        calculator.firstNum = calculator.displayValue;
        calculator.displayValue = '0';
        calculator.operator = value;
    }
}

//deletes the last input value
function backspace() {
    const display = document.querySelector('.value');
    calculator.displayValue = calculator.displayValue.substring(
        0, calculator.displayValue.length - 1);
    display.textContent = calculator.displayValue;
    console.log(calculator.displayValue);
    valueDisplay();
}

