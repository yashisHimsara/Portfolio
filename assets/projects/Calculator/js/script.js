const displayValue = $('#display');
var functionValue;
var firstValue;
var secondValue;

function display(input) {
    displayValue.val(displayValue.val() + input);
}

function fn(fn) {
    firstValue = displayValue.val();
    displayValue.val(displayValue.val() + fn);
    functionValue = fn;
}

function Additions() {
    displayValue.val(parseFloat(firstValue) + parseFloat(secondValue));
}

function Minus() {
    displayValue.val(parseFloat(firstValue) - parseFloat(secondValue));
}

function Multiply() {
    displayValue.val(parseFloat(firstValue) * parseFloat(secondValue));
}

function Divides() {
    displayValue.val(parseFloat(firstValue) / parseFloat(secondValue));
}

function calculate() {
    let expression = displayValue.val();
    let operands = expression.split(functionValue);
    firstValue = operands[0];
    secondValue = operands[1];

    if (functionValue === '+') {
        Additions();
    } else if (functionValue === '-') {
        Minus();
    } else if (functionValue === '*') {
        Multiply();
    } else if (functionValue === '/') {
        Divides();
    }
}

function percentage() {
    let currentValue = displayValue.val();

    if (functionValue) {
        let expression = displayValue.val();
        let operands = expression.split(functionValue);
        firstValue = operands[0];
        secondValue = operands[1];

        if (secondValue !== '') {
            secondValue = (parseFloat(secondValue) / 100).toString();
            displayValue.val(firstValue + functionValue + secondValue);
        }
    } else {
        displayValue.val((parseFloat(currentValue) / 100).toString());
    }
}

function ac() {
    let s = displayValue.val();
    s = s.slice(0, -1);
    displayValue.val(s);
}

function clearDisplay() {
    displayValue.val('');
    firstValue = null;
    secondValue = null;
}
