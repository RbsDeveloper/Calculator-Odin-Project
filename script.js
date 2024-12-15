const calcKeys = document.querySelectorAll('.number')
const result = document.getElementById('result');
const onHold = document.getElementById('onHold');
const operators = document.querySelectorAll('.operator');
const doCalcs = document.getElementById('doCalcs');
const clear = document.getElementById('clear');


//Three variables of the function

let firstNumber;
let sign;
let secondNumber;

    calcKeys.forEach(key => {
        key.addEventListener('click', ()=>{
            result.innerText += key.value
        })
    })

    operators.forEach(operator => {
            operator.addEventListener('click', ()=>{

                if(onHold.innerText!=='' && result.innerText!==''){

                    /*repetitive block of code, must create a helper F
                    secondNumber = Number(result.innerText);
                    onHold.innerText = "";
                    result.innerText = operate(firstNumber, sign, secondNumber);
                    firstNumber = Number(result.innerText);
                    sign = '';
                    secondNumber='';*/
                    helpCalculation();
                }
                
                firstNumber = Number(result.innerText);
                sign = operator.value;
                onHold.innerText = firstNumber+sign;
                result.innerText = '';
                
            })
        
    })

    doCalcs.addEventListener('click', ()=>{
        /*repetitive block of code, must create a helper F
        secondNumber = Number(result.innerText);
        onHold.innerText = "";
        result.innerText = operate(firstNumber, sign, secondNumber);
        firstNumber = Number(result.innerText);
        sign = '';
        secondNumber='';*/
        helpCalculation();
    })

    clear.addEventListener('click', ()=> {
        result.innerText = '';
        onHold.innerText = '';
        firstNumber = '';
        secondNumber = '';
        sign = '';
    })

 


//Callback used to operate the calculations

function helpCalculation () {
    secondNumber = Number(result.innerText);
        onHold.innerText = "";
        result.innerText = operate(firstNumber, sign, secondNumber);
        firstNumber = Number(result.innerText);
        sign = '';
        secondNumber='';
}



//Operate function 

function operate (num1, operator, num2) {
    if(operator==='+'){
       return add(num1, num2);
    }
    if(operator==='-'){
       return subtract(num1, num2);
    }
    if(operator==='*'){
       return multiply(num1, num2);
    }
    if(operator==='/'){
       return divide(num1, num2);
    }
}


//  FUNCTIONS FOR BASIC CALC OPERATIONS

function add  (a,b) {
    return a+b;
}

const subtract = (a,b)=> {
    return a-b;
};

const multiply = (a,b)=> {
    return a*b;
};

const divide = (a,b)=> {
    return a/b;
};


/*

A function that listens to what we press on the keyboard and populates the display with what we type:

    -Initially, it populates the display with the first number.
    -When an operator is pressed, this number is automatically stored in a variable, and the operator as well.
    -The area for entering the number is cleared, and the already entered number, along with the operator, is added to the list of processes.
    -At this point, after the second number is entered, it listens for an event on the "=" key.
    -If "=" is pressed, the process area is cleared, and the result is displayed on the first line.
   

*/