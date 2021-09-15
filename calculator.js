let grid = document.querySelector(".container");
let display = document.querySelector(".display");

let firstOperand = 0;
let secondOperand = 0;
let operator = 'none';


let operatorHit = false;
let operandTwoPressed = false;
let decimalPressed = false;

let operations = ['C', 'Del', '+/-', '-', '1', '2', '3', '+', '4', '5', '6', '*',
    '7', '8', '9', '/', '0', '.', '='];
let classNames = ['C', 'Del', 'sign', 'minus', 'one', 'two', 'three', 'plus', 'four', 'five', 'six',
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
//only show solution if = pressed or if we are on second operator
function displayNum(num) {
    //console.log(num);
    if (num > 999999999 || num < -999999999) {
        display.innerHTML = "Error: Max Size Exceeded";
    }
    else {
        display.innerHTML = num.toString().substring(0, 9);
    }

}

function saveOperand(e) {
    if (!operatorHit) {
        if (decimalPressed) {
            firstOperand = parseFloat( firstOperand.toString() +"."+ e.target.innerHTML);
            decimalPressed = false;
        }
        else {
            firstOperand = parseFloat(firstOperand.toString() + e.target.innerHTML);

        }
        console.log( e.target.innerHTML );

        firstOperand = parseFloat(firstOperand.toString().substring(0, 9));
        console.log(firstOperand);
        displayNum(firstOperand);
    }
    else {
        if (decimalPressed) {
            secondOperand = parseFloat( secondOperand.toString() +"."+ e.target.innerHTML);
            decimalPressed = false;
        }
        else {
            secondOperand = parseFloat(secondOperand.toString() + e.target.innerHTML);

        }
        secondOperand = parseFloat(secondOperand.toString().substring(0, 9));
        operandTwoPressed = true;
        displayNum(secondOperand);
    }
}

function operatorPressed(e) {
    operatorHit = true;
    operator = e.target.innerHTML;

}

function equalsPressed(e) {
    let num;
    //console.log(operator);
    switch (operator) {
        case '+':
            num = firstOperand + secondOperand;
            break;
        case '-':
            num = firstOperand - secondOperand;

            break;
        case '*':
            num = firstOperand * secondOperand;

            break;
        case '/':
            num = firstOperand / secondOperand;
            break;
        default:
            num = firstOperand;
    }
    //console.log(num);

    if (operandTwoPressed) {
        console.log(num);
        displayNum(num);
        operatorHit = false;
        firstOperand = num;
        secondOperand = 0;
        operandTwoPressed = false;
    }
}

function deleteNum() {

    if (!operandTwoPressed) {
        /*if (firstOperand % 1 !== 0) {
            let factor = 1;
            while ( firstOperand % 1 !== 0) {
                factor *=10;
                firstOperand*=10;
                console.log("loop");
            }
            firstOperand = Math.floor(firstOperand/10) * factor /10;
        }
        else {
            firstOperand =  Math.floor(firstOperand / 10);
            displayNum(firstOperand);
        }*/
        if (firstOperand.toString().length == 1 || (firstOperand < 0 && firstOperand.toString().length == 2)) {
            firstOperand = 0;
        }
        else {
            firstOperand = parseFloat(display.innerHTML.slice(0, -1));
        }

        console.log(firstOperand);
        displayNum(firstOperand);

    }
    else {
        //secondOperand =  Math.floor(secondOperand / 10); 
        if (secondOperand.toString().length == 1 || (secondOperand < 0 && secondOperand.toString().length == 2)) {
            secondOperand = 0;
        }
        else {
            secondOperand = parseFloat(display.innerHTML.toString().slice(0, -1));
        }

        displayNum(secondOperand);

    }
}

function clear() {
    display.innerHTML  = 0;
    firstOperand = 0;
    secondOperand = 0;
    operator = 'none';
    operatorHit = false;
    operandTwoPressed = false;
    decimalPressed = false;

}

function sign() {
    if(!operandTwoPressed) {
        console.log("switch sign");
        firstOperand = firstOperand * -1;
        displayNum(firstOperand);
    }
    else {
        secondOperand = secondOperand * -1;
        displayNum(secondOperand);
    }

}

function decimal() {
    if (operatorHit) {
        display.innerHTML = ".";
        decimalPressed = true;
    }
    else if (parseFloat(display.innerHTML) % 1 == 0) {
        display.innerHTML = display.innerHTML + ".";
        decimalPressed = true;
    }
}