// step1 - display all the button tags (required) in display box on clicking the buttons 
const displayBox = document.querySelector(".display-box")
const calcBtns = document.querySelectorAll('button')
// variable to store value 

var displayValue = ""; 
let lastOperator = "";
//Audio file
const prankAudio = new Audio("./aa.wav")


calcBtns.forEach(btn => {
    const buttonValue = btn.innerText
    btn.onclick = () =>{
        handleButtonAction(buttonValue)
    }
})
//on press event listiner | to make calc work with keyborad as well
document.addEventListener("keypress", (event)=>{
    if(event.code.includes("key")){
        return
    }

    handleButtonAction(event.key)
})

// function to display
const display = () => {
    displayBox.innerText = displayValue || "0.0"
}

const handleButtonAction = (buttonValue) => {
    
    // Handle action for = button i.e calculate instead of displaying it 
    if (buttonValue === "=" || buttonValue === "Enter"){
        const result = eval(displayValue)
        displayValue = String(result)
        //update the last operator in the operation 
        lastOperator = '';


        //prank logic
        const prankValue = generateRandomNumber()
        if(prankValue){
            displayBox.classList.add("prank")
            prankAudio.play()
        }
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
        if(!displayValue || displayValue === "-" || "+"){
            return
        }

    }
    

    // 2. Don't allow two conseutive operators
    if(["%", "/", "*","+","-"].includes(buttonValue)){
        const lastChar = displayValue.slice(-1)
        //update the last operator in the operation 
        lastOperator = buttonValue;
        if(["%", "/", "*","+","-"].includes(lastChar)){
            //removing character form display value or expression
            displayValue = displayValue.slice(0, -1);

        }
    }
   

    // making sure decimals expressions are correct 
    
      if(buttonValue === "."){
         const lastchar = displayValue.slice(-1);
         if(lastchar === "."){
            displayValue = displayValue.slice(0, -1);
         } 
         
         //find the current number set i.e number after the operator
         const lastOperatorIndex = displayValue.lastIndexOf(lastOperator)
         const currentNumberSet = displayValue.slice(lastOperatorIndex) || displayValue
         
         if(currentNumberSet.includes(".")){
            return
         }
    }


    

  
        // displaying the operation
    displayValue =  displayValue + buttonValue
    display (displayValue)
   

}

const generateRandomNumber = () => {
     const randomNumber = Math.round(Math.random() * 10)

    return randomNumber <= 3 ? randomNumber : 0
}

