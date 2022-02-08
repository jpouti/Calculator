function add(x, y) {
    return (x + y);
}

function subtract(x, y) {
    return (x - y);
}

function multiply(x, y) {
    return (x * y);
}

function divide(x, y) {
    if (y === 0) {
        // dividing by 0 is undefined
        return NaN;
    } else {
        return (x / y);
    }
}
