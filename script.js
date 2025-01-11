// step1 - display all the button tags (required) in display box on clicking the buttons 
const displayBox = document.querySelector(".display-box")
const calcBtns = document.querySelectorAll('button')
// variable to store value 

var displayValue = ""; 

calcBtns.forEach(btn => {
    const buttonValue = btn.innerText
    btn.onclick = () =>{
        handleButtonAction(buttonValue)
    }
})

// function to display
const display = () => {
    displayBox.innerText = displayValue || "0.0"
}

const handleButtonAction = (buttonValue) => {
    
    // Handle action for = button i.e calculate instead of displaying it 
    if (buttonValue === "="){
        const result = eval(displayValue)
        displayValue = String(result)
        display()
        return;

        
    }

    //Handle action for Ac (All clear) button
    if(buttonValue === "AC"){
        displayValue = "";
        display (displayValue)
        return;

    }

    // handle action for c (clear button)
    if(buttonValue === "C"){
        // goal is to remove last charachter from string use slice
        displayValue = displayValue.slice(0, -1)
        display(displayValue)
        return;
    }

    // making sure we have only expression for eval
    //1. some operators are not allowed in the beginning of numbers 
    if(["%", "/", "*"].includes(buttonValue)){
        if(!displayValue){
            return
        }

    }

    // 2. Don't allow two conseutive operators
    if(["%", "/", "*","+","-"].includes(buttonValue)){
        const lastChar = displayValue.slice(-1)
        if(["%", "/", "*","+","-"].includes(lastChar)){
            //removing character form display value or expression
            displayValue = displayValue.slice(0, -1);

        }
    }
    

  
        // displaying the operation
    displayValue =  displayValue + buttonValue
    display (displayValue)
   

}
