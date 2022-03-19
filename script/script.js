/*-----------------------Global variables-----------------------*/
let TopAreaValue = null;
let BottomAreaValue = null;
let CurrentOperator = null;
let OperatorArray = ["+","-","x","/"];

/*-----------------References to the elements on screen-----------------*/

let DisplayTopArea = document.querySelector(".DisplayTopArea");
let DisplayBottomArea = document.querySelector(".DisplayBottomArea");
let NumericButtons = document.querySelectorAll(".NumericButton");
let PointButton = document.querySelector(".PointButton");
let OperatorButtons = document.querySelectorAll(".OperatorButton");

/*-------------------------AddEventListeners-----------------------*/
NumericButtons.forEach(element => {
  element.addEventListener("click",PrintNumber)
});

OperatorButtons.forEach(element => {
  element.addEventListener("click",CallOperatorFunction);
});

PointButton.addEventListener("click",PrintNumber);

document.addEventListener("keydown",CallCorrespondingFunction);


/*----------------------Referencias a los botones----------------------*/

// Calls the function corresponding to the bottom that was selected if the character maches any of them.
function CallCorrespondingFunction(e){
  if(!(isNaN(e.key)) || e.key === ".") return PrintNumber(e);

  OperatorArray.forEach(element => {
    if(e.key === element) CallOperatorFunction(e);
  })
}

// Prints only numbers or the "." to the bottom area of the display.
function PrintNumber(e){
  let textContent = '';
  (e.type === "click") ? textContent = e.target.textContent : textContent = e.key;

  if((isNaN(textContent)) && textContent !== ".") return;

  if(textContent === "." && DisplayBottomArea.textContent.includes(".")) return;

  DisplayBottomArea.textContent === "0" ? DisplayBottomArea.textContent = textContent : DisplayBottomArea.textContent = DisplayBottomArea.textContent + textContent;

  BottomAreaValue = DisplayBottomArea.textContent;
}

// It executes the corresponding action in regards to the operators bottoms
function CallOperatorFunction(e){
  let textContent = '';
  (e.type === "click") ? textContent = e.target.textContent : textContent = e.key;
  if(TopAreaValue !== null && CurrentOperator !== null && BottomAreaValue !== null) ExecuteOperationByOperator(textContent);
  else if(TopAreaValue === null && CurrentOperator === null && BottomAreaValue !== null) FillDisplayArea(textContent);
  else if(TopAreaValue !== null && CurrentOperator !== null && BottomAreaValue === null) ChangeOperator(textContent);
}

// It executes the current operation in queue and fills the display area and 
// its corresponding variablesand also resets the ones that need to be reset.
function ExecuteOperationByOperator(textContent){
  let result = CalculateResult(CurrentOperator);
  if (result === null) return; 
  DisplayTopArea.textContent = result + textContent;
  TopAreaValue = result;
  CurrentOperator = textContent;
  DisplayBottomArea.textContent = 0;
  BottomAreaValue = null;
}

// It fills the top part with the corresponding operator and restarts the bottom part.
function FillDisplayArea(textContent){
  DisplayTopArea.textContent = BottomAreaValue + textContent;
  TopAreaValue = BottomAreaValue;
  CurrentOperator = textContent;
  DisplayBottomArea.textContent = 0;
  BottomAreaValue = null;
}

// It changes the current operation being displayed on screen.
function ChangeOperator(textContent){
  DisplayTopArea.textContent = DisplayTopArea.textContent.replace(CurrentOperator,textContent)
  CurrentOperator = textContent;
}

function ExecuteOperationByEqual(textContent){
  let result = OperationFunctions.textContent;
}

function CalculateResult(textContent){

  let OperationFunctions = {
    '+': parseFloat(TopAreaValue) + parseFloat(BottomAreaValue),
    '-': parseFloat(TopAreaValue) - parseFloat(BottomAreaValue),
    'x': parseFloat(TopAreaValue) * parseFloat(BottomAreaValue),
    '/': parseFloat(TopAreaValue) / parseFloat(BottomAreaValue)
  }
  /*
  let OperationFunctions = {
    '+': parseInt(TopAreaValue) + parseInt(BottomAreaValue),
    '-': parseInt(TopAreaValue) - parseInt(BottomAreaValue),
    'x': parseInt(TopAreaValue) * parseInt(BottomAreaValue),
    '/': parseInt(TopAreaValue) / parseInt(BottomAreaValue)
  }*/

  if(Object.is(NaN, OperationFunctions[textContent]) === false && OperationFunctions[textContent] !== Infinity) return (OperationFunctions[textContent]).toFixed(2);
  return null;
}

root = document.documentElement;
root.className = "theme-1";