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

  if(textContent === "." && DisplayBottomArea.textContent.includes(".")){
    return;
  }

  DisplayBottomArea.textContent = DisplayBottomArea.textContent + textContent;
  BottomAreaValue = DisplayBottomArea.textContent;
}

// It executes the corresponding action in regards to the operators bottoms
function CallOperatorFunction(e){
  if(TopAreaValue !== null && CurrentOperator !== null && BottomAreaValue !== null) ExecuteOperation(e);
  if(TopAreaValue === null && CurrentOperator === null && BottomAreaValue !== null) FillDisplayArea(e);
  if(TopAreaValue !== null && CurrentOperator !== null && BottomAreaValue === null) ChangeOperator(e);
}

// It executes the current operation in queue
function ExecuteOperation(){

}

// It fills the top part with the corresponding operator and restarts the bottom part.
function FillDisplayArea(e){
  /*
  DisplayTopArea.textContent = DisplayBottomArea.textContent + ;
  TopAreaValue = DisplayTopArea.textContent;*/
}

// It changes the current operation being displayed on screen.
function ChangeOperator(){

}



root = document.documentElement;
root.className = "theme-1";