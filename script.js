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
const themeSelector = document.getElementById('theme');
const historyBtn = document.getElementById('history');
const hOverlay = document.getElementById('history-cortine');
const clearHistory = document.getElementById('trash');
const quitHistoryBtn = document.getElementById('quit');
const calcList = document.getElementById('history-panel');
const root = document.documentElement;

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
        onHold.innerText = "";
        result.innerText = "";
        let audio = new Audio("fart.mp3");
        audio.play()
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

// This array stores the history of all calculations made by the user.
let calcHistory = [];

// This function creates an object to represent each operation performed by the calculator.
function Calc(firstN, operator, secondN, result) {
    this.firstNumber = firstN;
    this.operator = operator;
    this.secondNumber = secondN;
    this.finalR = result;
}

// Toggles the visibility of the history overlay when the history button is clicked. 

historyBtn.addEventListener('click', ()=> {
    hOverlay.style.display = "block";
    updateHistoryDisplay();
});

quitHistoryBtn.addEventListener('click', ()=> {
    hOverlay.style.display = "none";
})

// Clears all stored calculations from the history and updates the display.
clearHistory.addEventListener('click', ()=> {
    calcHistory = [];
    updateHistoryDisplay();
})

// Updates the history display by adding all calculations from the calcHistory array to the DOM.
function updateHistoryDisplay() {
    calcList.innerHTML= '';
    calcHistory.forEach((operation)=>{
        const div = document.createElement('div');
        div.classList.add('operation');
        div.innerText = `${operation.firstNumber} ${operation.operator} ${operation.secondNumber} = ${operation.finalR}`;
        calcList.appendChild(div);
    })
}


// Perform the specified operation 
function operate (num1, operator, num2) {


    if(operator==='+'){
       calcHistory.push(new Calc(num1, operator, num2, add(num1, num2))); 
       console.log(calcHistory)
       return add(num1, num2);
    }
    if(operator==='-'){
        calcHistory.push(new Calc(num1, operator, num2, subtract(num1, num2)));
        console.log(calcHistory)
       return subtract(num1, num2);
    }
    if(operator==='*'){
        calcHistory.push(new Calc(num1, operator, num2, multiply(num1, num2)));
        console.log(calcHistory)
       return multiply(num1, num2);
    }
    if(operator==='/'){
        if(num2 !== 0){
            calcHistory.push(new Calc(num1, operator, num2, divide(num1, num2)));
            console.log(calcHistory)
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

//CENTRALIZING EVERY BTN OF THE APP TO MAP OVER THEM AT EACH KEYDOWN EVENT INSTEAD OF LOOPING THROUGH ARRAYS.

// Initialize an empty object to map keyboard keys to corresponding calculator buttons
const keyToButtonsMap = {};
// Populate the map with number keys (0-9) by associating each key's value with the corresponding button
calcKeys.forEach(calcKey => {
    keyToButtonsMap[calcKey.value] = calcKey;
})

// Add mappings for special keys (operators and actions) by assigning them to specific buttons
Object.assign(keyToButtonsMap, {
    '+': document.querySelector('.operator[value="+"]'),
    '-': document.querySelector('.operator[value="-"]'),
    '*': document.querySelector('.operator[value="*"]'),
    '/': document.querySelector('.operator[value="/"]'),
    Backspace: deleteBtn,
    Escape: clear,
    '=': doCalcs,
    '.': dot
})
// Add an event listener for keydown events on the entire document
document.addEventListener('keydown', (e)=>{
    // Ignore repeated keydown events to avoid multiple unintended clicks
    if(e.repeat){
        return
    }
    // If a mapped button exists for the key, simulate a click on the corresponding button
    const button = keyToButtonsMap[e.key];
    if(button){
        button.click();
    }

    /*
    OLD LOGIC
    const key = e.key;
    if(e.repeat){
        return
    }
    if(key >= 0 && key <= 9){
        calcKeys.forEach(webKey => {
            if(key===webKey.value){
                webKey.click()
            }
        })
    }
    if(['+','-','*','/'].includes(key)){
        operators.forEach(operator =>{
            if(key === operator.value){
                operator.click()
            }
        })
    }
    if(key==='Backspace'){
        deleteBtn.click()
    }
    if(key==='Escape'){
        clear.click()
    }
    if(key === '=' || key ==='Enter'){
        doCalcs.click()
    }
    if(key === '.'){
        dot.click()
    }
        */
})

// These objects define the color variables for each theme, which are applied dynamically in the changeTheme function.
const greenTheme = {
    "--background-color":"#4F772D",
    "--display-color":"#132A13",
    "--keyboard-bg-color":"#31572C",
    "--buttons-color":"#ECF39E",
    "--important-btn-color":"#90A955",
    "--font-color": "#FFF",
}

const violetTheme = {
    "--background-color":"#613DC1", //ok
    "--display-color":"#2C0735",//ok
    "--keyboard-bg-color":"#4E148C",//ok
    "--buttons-color":"#858AE3",
    "--important-btn-color":"#97DFFC",
    "--font-color": "#FFF",
}

const redTheme = {
    "--background-color":"#FB4B4E",
    "--display-color":"#3E000C",
    "--keyboard-bg-color":"#7C0B2B",
    "--buttons-color":"#FFCBDD",
    "--important-btn-color":"#D10000",
    "--font-color": "#FFF",
}


// Updates the root element's CSS variables to apply the selected theme's colors.
const setRoot = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));

// Changes the calculator's theme based on the selected option in the theme selector dropdown.
themeSelector.addEventListener('input', changeTheme)

function changeTheme() {
    if(themeSelector.value === "1"){
        setRoot(greenTheme)
    }else if(themeSelector.value === "2"){
        setRoot(violetTheme);
        
    }else if(themeSelector.value === "3"){
        setRoot(redTheme);
    }
}





