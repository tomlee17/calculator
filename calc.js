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

function operate(operator, a, b) {
    return operator(a, b);
}

const display = document.querySelector('.display');
display.textContent = '0';

const inputs = document.querySelectorAll('.buttons-container>div')
inputs.forEach(function (number) {
    if (/[0-9]/.test(number.textContent)) {
        number.classList.add('numbers');
    }
})
const numbers = document.querySelectorAll('.numbers');
const operations = document.querySelectorAll('.operations');

let num1;
let operator;
let num2;
const operatorFunctions = {
    multiply,
    divide,
    subtract,
    add,
}

numbers.forEach(function (number) {
    number.addEventListener('click', function () {
        if (display.textContent === '0') {
            display.textContent = number.textContent;
        }
        else display.textContent += number.textContent;
    });
});

operations.forEach(function (operation) {
    operation.addEventListener('click', function (e) {
        if (/[-+*/]/.test(display.textContent.slice(-1))) return;
        if (/[-+*/]/.test(display.textContent)) {
            num2 = +display.textContent.split(/[-+*/]/)[1];
            num1 = operate(operatorFunctions[operator], num1, num2);
            console.log(num2, num1);
            display.textContent = num1 + operation.textContent;
        } else {
            num1 = +display.textContent;
            display.textContent += operation.textContent;
        }
        operator = operation.id;
    });
});

const equal = document.querySelector('#equal');
equal.addEventListener('click', function (e) {
    if (display.textContent.slice(-1).match(/[-+*/]/)) return;
    num2 = +display.textContent.split(/[-+*/]/)[1];
    display.textContent = operate(operatorFunctions[operator], num1, num2);
})

const clear = document.querySelector('#clear');
clear.addEventListener('click', function (e) {
    display.textContent = '0';
})