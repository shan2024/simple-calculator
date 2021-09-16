let grid = document.querySelector(".container");
let display = document.querySelector(".display");

let firstOperand = "";
let secondOperand = "";
let operator = 'none';


let operatorHit = false;
let operandTwoPressed = false;
let decimalPressed = false;
let pressedEquals = false;

let operations = ['C', 'Del', '+/-', '+', '1', '2', '3', '-', '4', '5', '6', '×',
    '7', '8', '9', '÷', '0', '.', '='];
let classNames = ['C', 'Del', 'sign', 'plus', 'one', 'two', 'three', 'minus', 'four', 'five', 'six',
    'mult', 'seven', 'eight', 'nine', 'div', 'zero', 'dec', 'equals'];

operations.forEach(function (item, index, array) {
    let unit = document.createElement("button");
    unit.classList.add("unit");
    unit.classList.add(classNames[index]);
    unit.innerHTML = item;
    grid.appendChild(unit);

    if (!isNaN(item)) {
        unit.addEventListener("click", saveOperand);
    }
});

let addOperator = document.querySelector(".plus");
let subOperator = document.querySelector(".minus");
let multOperator = document.querySelector(".mult");
let divOperator = document.querySelector(".div");

addOperator.addEventListener("click", operatorPressed);
subOperator.addEventListener("click", operatorPressed);
multOperator.addEventListener("click", operatorPressed);
divOperator.addEventListener("click", operatorPressed);

let equals = document.querySelector(".equals");
equals.addEventListener("click", equalsPressed);

let del = document.querySelector(".Del");
del.addEventListener("click", deleteNum);

let clearButton = document.querySelector(".C");
clearButton.addEventListener("click", clear);

let signButton = document.querySelector(".sign");
signButton.addEventListener("click", sign);

let decButton = document.querySelector(".dec");
decButton.addEventListener("click", decimal);

function displayNum(num) {
    if ( num != "." && !isFinite(num)) {
        clear();
        display.innerHTML = "Error: NaN"
    }
    else if (num > 999999999 || num < -999999999) {
        clear();
        display.innerHTML = "Error: Inf";
    }
    else {
        display.innerHTML = num.toString().substring(0, 8);
    }

}

function saveOperand(e) {
    let operand;
    if ( pressedEquals) {
        clear();
        pressedEquals = false;
    }
    if (!operatorHit) {
        firstOperand = firstOperand + e.target.innerHTML;

        

        operand = firstOperand.toString().substring(0, 8);
    }
    else {      
        secondOperand = secondOperand.toString() + e.target.innerHTML;   
        operand = secondOperand.toString().substring(0, 8);
        operandTwoPressed = true;
    }
    displayNum(operand);
}

function operatorPressed(e) {
    if (!operatorHit) {
        operatorHit = true;
        operator = e.target.innerHTML;
        pressedEquals = false;
    }
    else if (operandTwoPressed && operatorHit) {
        equalsPressed();
        operatorHit = true;
        operator = e.target.innerHTML;
        pressedEquals = false;
    }
    

}

function equalsPressed() {
    let num;
    switch (operator) {
        case '+':
            num = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            num = parseFloat(firstOperand) - parseFloat(secondOperand);

            break;
        case '×':
            num = parseFloat(firstOperand) * parseFloat(secondOperand);

            break;
        case '÷':
            num = parseFloat(firstOperand) / parseFloat(secondOperand);
            
            break;
        default:
            num = parseFloat(firstOperand);
    }
    if(num.toString().includes('e-')) {
        num = "0";
    }
    if (operandTwoPressed) {
        firstOperand = num.toString();
        secondOperand = "";
        displayNum(num);
        operatorHit = false;
        operandTwoPressed = false;
        pressedEquals = true;
    }
}

function deleteNum() {

    if (display.innerHTML == 'Error: Inf' || display.innerHTML == 'Error: NaN') {
    }
    else if (!operandTwoPressed) {
       
        if (firstOperand.length == 1 || (firstOperand < 0 && firstOperand.length == 2) ||
                (firstOperand.includes("0") && firstOperand.length == 2 && firstOperand.includes("-") )) {
            firstOperand = "0";
        }
        else {
            firstOperand = display.innerHTML.slice(0, -1);
        }

        displayNum(firstOperand);

    }
    else {
        if (secondOperand.length == 1 || (secondOperand < 0 && secondOperand.length == 2) ||
                (secondOperand.includes("0") && secondOperand.length == 2 && secondOperand.includes("-") ) ) {
            secondOperand = "0";
        }
        else {
            secondOperand = display.innerHTML.toString().slice(0, -1);
        }

        displayNum(secondOperand);

    }
}

function clear() {
    display.innerHTML = 0;
    firstOperand = '';
    secondOperand = '';
    operator = 'none';
    operatorHit = false;
    operandTwoPressed = false;
    decimalPressed = false;
    pressedEquals = false;

}

function sign() {
    if(!operandTwoPressed && !isNaN(parseFloat(firstOperand))) {
        firstOperand = (parseFloat(firstOperand) * -1).toString();
        displayNum(firstOperand);
    }
    else if (operandTwoPressed &&!isNaN(parseFloat(secondOperand))) {
        secondOperand = (parseFloat(secondOperand) * -1).toString();
        displayNum(secondOperand);
    }

}

function decimal() {
        
        if( !pressedEquals && ( (!operatorHit && !firstOperand.includes('.')) || firstOperand == '')) {
            firstOperand = firstOperand + ".";
            displayNum(firstOperand);
        }
        else if(operandTwoPressed && !secondOperand.includes('.')) {
            secondOperand = secondOperand +".";
            displayNum(secondOperand);
        }
    
}

