/*-----------------------Global variables-----------------------*/
let TopAreaValue = null;
let BottomAreaValue = null;
let CurrentOperator = null;
let OperatorArray = ["+","-","x","/"];
root = document.documentElement;
root.className = "theme-1"

/*-----------------References to the elements on screen-----------------*/

let DisplayTopArea = document.querySelector(".DisplayTopArea");
let DisplayBottomArea = document.querySelector(".DisplayBottomArea");
let NumericButtons = document.querySelectorAll(".NumericButton");
let PointButton = document.querySelector(".PointButton");
let OperatorButtons = document.querySelectorAll(".OperatorButton");
let DeleteButton = document.querySelector(".Delete");
let ResetButton = document.querySelector(".Reset");
let EqualButton = document.querySelector(".Equal");
let theme_1 = document.querySelector("#theme_1");
let theme_2 = document.querySelector("#theme_2");
let theme_3 = document.querySelector("#theme_3");

/*-------------------------AddEventListeners-----------------------*/
NumericButtons.forEach(element => {
  element.addEventListener("click",PrintNumber)
});

OperatorButtons.forEach(element => {
  element.addEventListener("click",CallOperatorFunction);
});

PointButton.addEventListener("click",PrintNumber);
DeleteButton.addEventListener("click",Delete);
ResetButton.addEventListener("click",Reset);
EqualButton.addEventListener("click",ExecuteOperationByEqual);
theme_1.addEventListener("click",ChangeTheme);
theme_2.addEventListener("click",ChangeTheme);
theme_3.addEventListener("click",ChangeTheme);

document.addEventListener("keydown",CallCorrespondingFunction);


/*----------------------Calculator functions----------------------*/

// Calls the function corresponding to the bottom that was selected if the character maches any of them.
function CallCorrespondingFunction(e){
  if(!(isNaN(e.key)) || e.key === ".") return PrintNumber(e);

  OperatorArray.forEach(element => {
    if(e.key === element) CallOperatorFunction(e);
  })

  if(e.key === "Backspace") Delete();

  if(e.key === "Escape") Reset();

  if(e.key === "Enter") ExecuteOperationByEqual(e);
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

function Delete(e){
  //let textContent = '';
  let length = DisplayBottomArea.textContent.length;
  //(e.type === "click") ? textContent = e.target.textContent : textContent = e.key;

  DisplayBottomArea.textContent = DisplayBottomArea.textContent.slice(0,length-1);
  if(DisplayBottomArea.textContent.length === 0){
    DisplayBottomArea.textContent = "0";
    BottomAreaValue = null;
  }
  else BottomAreaValue = DisplayBottomArea.textContent;
}

function Reset(){
  DisplayTopArea.textContent = "";
  DisplayBottomArea.textContent = "0";
  TopAreaValue = null;
  BottomAreaValue = null;
  CurrentOperator = null;
}

function ExecuteOperationByEqual(e){
  let result = CalculateResult(CurrentOperator);
  if(result === null) return;
  DisplayTopArea.textContent = "";
  DisplayBottomArea.textContent = result;
  TopAreaValue = null;
  CurrentOperator = null;
  BottomAreaValue = DisplayBottomArea.textContent;
}

function CalculateResult(textContent){

  let OperationFunctions = {
    '+': parseFloat(TopAreaValue) + parseFloat(BottomAreaValue),
    '-': parseFloat(TopAreaValue) - parseFloat(BottomAreaValue),
    'x': parseFloat(TopAreaValue) * parseFloat(BottomAreaValue),
    '/': parseFloat(TopAreaValue) / parseFloat(BottomAreaValue)
  }

  if(Object.is(NaN, OperationFunctions[textContent]) === false && OperationFunctions[textContent] !== Infinity) return (OperationFunctions[textContent]).toFixed(2);
  return null;
}

/*----------------------Toogle functions----------------------*/

function ChangeTheme(e){
  let textContent = '';
  (e.type === "click") ? textContent = e.target.textContent : textContent = e.key;

  if(textContent === "1"){
    document.getElementById("circle-theme").style.justifyContent = "flex-start";
    console.log('hola');
    //root.className = "theme-1"

  }
  else if(textContent === "2"){
    document.getElementById("circle-theme").style.justifyContent = "center";
    //root.className = "theme-2"
   
  }
  else{
    document.getElementById("circle-theme").style.justifyContent = "end";
    //root.className = "theme-3"
  }
}

