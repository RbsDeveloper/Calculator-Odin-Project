const calcKeys = document.querySelectorAll('.number')
const result = document.getElementById('result');
const onHold = document.getElementById('onHold');
const operators = document.querySelectorAll('.operator');
const doCalcs = document.getElementById('doCalcs');
const clear = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const decimalSeparator = document.getElementById('decimalSeparator');
const keyboard = document.querySelector('.buttons-zone')
const dot = document.getElementById('dot')


/*
This comment reflects the initial thought process and logic that served as the foundation for this calculator app. 
The app has grown and evolved from these basic principles.

This application listens for keyboard or button input and performs calculations dynamically:

    - Initially, the display is populated with the first number entered by the user.
    - When an operator is pressed, the first number and operator are stored in variables.
    - The display is cleared to allow the user to enter the second number.
    - Simultaneously, the first number and the operator are shown in the "onHold" display to indicate the current operation in progress.
    - After the second number is entered, the application listens for an event on the "=" button.
    - When "=" is pressed, the calculation is performed using the stored numbers and operator.
    - The result is displayed in the main display, and the process is reset for further calculations.
    - Additionally, the app supports continuous calculations, where the result of one operation can serve as the first number for the next operation without resetting the app.

*/


//Three global variables essential for the functions

let firstNumber;
let sign;
let secondNumber;

//Event used to insert inputs to perform calculations
calcKeys.forEach(key => {
    key.addEventListener('click', ()=>{
    result.innerText += key.value
    })
})

// Event used to insert an operator, confirm the first number entered, 
// and clear the input zone for the second number
operators.forEach(operator => {
    operator.addEventListener('click', ()=>{

        // This IF block allows us to perform continuous calculations. 
        // For example, if we enter a calculation and press another operator 
        // (instead of the equals button), the first operation is executed, 
        // and its result is used as the first number for the next operation.

        if(onHold.innerText!=='' && result.innerText!==''){
            // Refactored repetitive code into helpCalculation() for better readability and maintainability
            helpCalculation();
            }
                
            firstNumber = Number(result.innerText);
            sign = operator.value;
            onHold.innerText = firstNumber+sign;
            result.innerText = '';  
    })
        
})

// If we press the equals button, calculations are performed
doCalcs.addEventListener('click', ()=>{
    // Refactored repetitive code into helpCalculation() for better readability and maintainability
    helpCalculation();  
})
    
// Functionality for the clear button
clear.addEventListener('click', ()=> {
    result.innerText = '';
    onHold.innerText = '';
    firstNumber = '';
    secondNumber = '';
    sign = '';
})


    //Functionality for the delete button
    deleteBtn.addEventListener('click', ()=>{ 
        if(result.innerText === '' && onHold.innerText !==''){
            const inside=onHold.innerText.split('');
            const newInside = inside.slice(0, inside.length-1).join('');
            onHold.innerText = '';
            result.innerText = newInside;
            sign= '';
            console.log(sign)
            
        }else{
            const inside = result.innerText.split('');
            const newInside = inside.slice(0, inside.length-1).join('');
            result.innerText = newInside;
        }

        
    })
    
// This function checks after each button click if the conditions in 
// validatePossibleCalc and separatorChecker are met
keyboard.addEventListener("click", ()=> {
    validatePossibleCalc();
    separatorChecker();
    avoidMultipleOperators();
})


// Handles adding the dot (decimal point) to a number. 
// A validation function filters the input before allowing the dot.
dot.addEventListener('click', ()=>{
    if(result.innerText%1 != 0){
        dot.disabled = true;
    }else{
        dot.disabled=false;
        result.innerText += '.';
    }
})


// Handles calculations for both the "=" button and operator chaining functionality.
function helpCalculation () {

    /* First we set the second number then we check if the user is trying to divide by zero, we can't allow that */

    secondNumber = Number(result.innerText);

    if(sign==='/' && secondNumber === 0){
        //Need to develop a functionality here
        console.log("nope")
    }else{
        onHold.innerText = "";
        result.innerText = operate(firstNumber, sign, secondNumber);
        firstNumber = Number(result.innerText);
        sign = '';
        secondNumber='';
    }
}


// Enable or disable the '=' button based on input validity 
function validatePossibleCalc() {
    if(firstNumber !== undefined && result.innerText.trim() !== '' && sign !== ''){
        doCalcs.disabled = false;
    }else{
        doCalcs.disabled = true;
    }
}


// Enable or disable the dot (decimal point) button based on input validity
function separatorChecker() {
    if(result.innerText.includes('.')) {
        dot.disabled = true;
    }else{
        dot.disabled = false;
    }
}

// Perform the specified operation 
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
        if(num2 !== 0){
            return divide(num1, num2);
        }else{
            return 0
        }
        
    }
}

// Functions for basic calculator operations
function add  (a,b) {
    return helpRounding(a+b);
}

const subtract = (a,b)=> {
    return helpRounding(a-b)
};

const multiply = (a,b)=> {
    return helpRounding(a*b)
};

const divide = (a,b)=> {
    return helpRounding(a/b)
    
};

// Round the result to two decimal places if necessary
function helpRounding(operation) {
    return Math.round((operation) *100) / 100;
}

//
function avoidMultipleOperators () {
    if(sign === undefined || sign === '' || sign !== undefined && result.innerText !== ''){
        operators.forEach(operator=>operator.disabled=false)
    }else{
        operators.forEach(operator=>operator.disabled=true)
    }
}




