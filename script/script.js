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

    // display calculated value and reset displayValue and operator from the object
    if (target.classList.contains('equal')) {
        if (calculator.operator != null) {
            console.log(calculator.displayValue);
            calculator.displayValue = operate(
                parseFloat(calculator.firstNum), parseFloat(calculator.displayValue), calculator.operator);
            calculator.displayValue = calculator.displayValue.toPrecision(4).toString();
            valueDisplay();
//            calculator.displayValue = calculator.displayValue.toString();
            calculator.firstNum = calculator.displayValue;
            calculator.displayValue = '0';
            calculator.operator = null;
            calculator.lastEqual = true;
            calculator.decimal = false;
            return;   
        } else {
            calculator.firstNum = calculator.displayValue;
            calculator.secondNumInput = false;
            calculator.displayValue = '0';
            return;
        }
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
        if (calculator.decimal === true) {
            return;
        } else {
            valueInput(target.value);
            calculator.decimal = true;
            return;
        }
    }

    valueInput(target.value); 

})
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
    console.log('operator')
    if (calculator.secondNumInput === false) {
        calculator.operator = value;
        calculator.firstNum = calculator.displayValue;
        calculator.displayValue = '0';
        calculator.secondNumInput = true;
        calculator.decimal = false;
        // makes the operator work after the first calculation, storing the values correctly
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
//        calculator.displayValue = calculator.displayValue.toString();    
        valueDisplay();
        calculator.firstNum = calculator.displayValue;
        calculator.displayValue = '0';
        calculator.operator = value;
        calculator.decimal = false;
    }
}

// deletes the last input value
function backspace() {
    const display = document.querySelector('.value');
    calculator.displayValue = calculator.displayValue.substring(
        0, calculator.displayValue.length - 1);
    display.textContent = calculator.displayValue;
    console.log(calculator.displayValue);
    valueDisplay();
}

