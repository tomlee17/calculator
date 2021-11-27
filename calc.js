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
let refreshNumCheck;

numbers.forEach(function (number) {
    number.addEventListener('click', function () {
        if (display.textContent === '0' || display.textContent === 'ERROR' || refreshNumCheck === display.textContent) {
            display.textContent = this.textContent;
        }
        else display.textContent += this.textContent;
    });
});


const float = document.querySelector('#float');
float.addEventListener('click', function () {
    if (display.textContent.split(/[-+*/]/).slice(-2).every(num => num.includes('.'))) return;
    if (display.textContent === 'ERROR' || refreshNumCheck === display.textContent) {
        display.textContent = this.textContent;
    }
    else display.textContent += this.textContent;
})

operations.forEach(function (operation) {
    operation.addEventListener('click', function () {
        if (display.textContent === 'ERROR') return;
        if (/[-+*/]/.test(display.textContent.slice(-1))) return;
        if (/[-+*/]/.test(display.textContent.slice(1))) {
            runCalc(operation);
        } else {
            num1 = +display.textContent;
            display.textContent += operation.textContent;
        }
        operator = operation.id;
    });
});

const equal = document.querySelector('#Enter');
equal.addEventListener('click', function () {
    if (/[-+*/]/.test(display.textContent.slice(-1))) return;
    if (/[-+*/]/.test(display.textContent.slice(1))) {
        runCalc();
        refreshNumCheck = display.textContent;
    }
})

function runCalc(operation = '') {
    num2 = +display.textContent.split(/[-+*/]/).slice(-1);
    if (num2 === 0 && operator === 'divide') {
        display.textContent = 'ERROR';
    }
    else {
        display.textContent = operate(operatorFunctions[operator], num1, num2);
        num1 = +display.textContent;
        display.textContent = Math.round((+display.textContent + Number.EPSILON) * 1000) / 1000;
        if (operation !== '') display.textContent = display.textContent + operation.textContent;
    }
}

const clear = document.querySelector('#Backspace');
clear.addEventListener('click', function (e) {
    display.textContent = '0';
})

const del = document.querySelector('#Delete');
del.addEventListener('click', function () {
    if (display.textContent.length === 1) display.textContent = '0';
    else display.textContent = display.textContent.slice(0, display.textContent.length - 1);
})

const percent = document.querySelector('#percent');
percent.addEventListener('click', function () {
    if (/[-+*/]/.test(display.textContent.slice(-1))) return;
    if (display.textContent === '0' || display.textContent === 'ERROR' || refreshNumCheck === display.textContent) return;
    const stringArr = display.textContent.split(/([-+*/])/);
    stringArr[stringArr.length - 1] /= 100;
    display.textContent = stringArr.join('');
})

window.addEventListener('keydown', function (e) {
    if (/[0%\-+*/.]/.test(e.key)) {
        const operations = document.querySelector(`div[data-key="${e.key}"]`);
        operations.click();
    } else {
        const number1_9 = document.querySelector(`div[id="${e.key}"]`);
        number1_9.click();
    }
})