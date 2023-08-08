let firstTimeUsed = true; // Boolean to check if it's the first time the calculator is used (reset to true when cleared or all digits deleted)

function main()
{
    // DOM elements relevant for the calculator
    const operationPreviewDiv = document.querySelector(".operation-preview");
    const resultPreviewDiv = document.querySelector(".result-preview");

    // Grab Specific Buttons
    const clearBtn = document.querySelector(".button.clear");
    const deleteBtn = document.querySelector(".button.delete");
    const pointBtn = document.querySelector(".button.point");
    const equalsBtn = document.querySelector(".button.equals");
    const operationBtns = Array.from(document.querySelectorAll(".button.operation"));
    const digitsBtn = Array.from(document.querySelectorAll(".button.number"));
    const typingBtns = [...digitsBtn, ...operationBtns, pointBtn, equalsBtn];

    // Clear the calculator
    clearBtn.addEventListener("click", () => clearCalculator(operationPreviewDiv, resultPreviewDiv));

    // Delete from the calculator
    deleteBtn.addEventListener("click", () => removeLastNumber(operationPreviewDiv, resultPreviewDiv));

    // Handle Typing Button
    typingBtns.forEach(typingBtn => {
        typingBtn.addEventListener("click", (e) => typeCalculatingBtn(e, operationPreviewDiv, resultPreviewDiv));
    });

}

/* Event Handlers */
function clearCalculator(operationPreview, resultPreview)
{
    /* Clear the calculator */
    operationPreview.textContent = "";
    resultPreview.textContent = 0;
    firstTimeUsed = true;
}

function removeLastNumber(operationPreview, resultPreview)
{
    /*Delete the last digit from the results preview */
}

function typeCalculatingBtn(e, operationPreview, resultPreview)
{
    /* Choose what to do when a calculating button is pressed */

    // Grab the text content of the clicked button
    let buttonTextContent = getArrFromStr(e.target.textContent);
    buttonTextContent = getArrWithoutWhiteSpace(buttonTextContent);
    buttonTextContent = getStrFromArr(buttonTextContent);

    // Grab the contents of the operation preview and result preview removing all whitespace
    const operationPreviewContentAsArr = getArrWithoutWhiteSpace(getArrFromStr(operationPreview.textContent));
    const resultPreviewContentAsArr = getArrWithoutWhiteSpace(getArrFromStr(resultPreview.textContent));

    // Grab the type of text content
    const charType = getCharType(buttonTextContent);
    
    // Check if it's the first time the calculator is used
    if (firstTimeUsed)
    {
        // Ignore result preview since user has not executed any operation yet
        
    }

    else
    {
        // Consider result preview since user has executed one before
    }

}

function chooseOperation(char)
{
    /* Return which arithmetic operation has to be executed */
    let operation = "";

    switch (char)
    {
        case "+":
            operation = "plus";
            break;
        
        case "-":
            operation = "minus";
            break;
        
        case "×":
            operation = "product";
            break;
        
        case "÷":
            operation = "divide";
            break;
        
        default:
            operation = "unknown";
    }

    return operation;
}

function executeOperation(num1, num2, operation)
{
    /* Execute an operation on two numbers based on the operation type */
    let result = 0;

    switch (operation)
    {
        case "plus":
            result = num1 + num2;
            break;
        
        case "minus":
            result = num1 - num2;
            break;
        
        case "product":
            result = num1 * num2;
            break;
        
        case "divide":
            result = num1 / num2;
            break;
        
        default:
            {
                // Do nothing when the operation is unknown
            }
    }

    return roundToTwoDigits(result);
}

/* Helpers */
function addClassIfAbsent(element, className)
{
    /* Adds a class to a DOM's element classList if the class is not present */
    if (!element.classList.contains(className))
    {
        element.classList.add(className);
    }
}

function removeClassIfPresent(element, className)
{
    /* Remove a class from a DOM's element classList if the class is present */
    if (element.classList.contains(className))
    {
        element.classList.remove(className);
    }
}

function isPoint(char)
{
    /* Return true if the character is equal to . */
    return char === ".";
}

function isEquals(char)
{
    return char === "=";
}

function isOperationSymbol(char)
{
    /* Return true if the given character represents an arithmetical operation */
    const arithOrs = ["+", "-", "×", "÷"];
    return arithOrs.includes(char);
}

function isDigit(char)
{
    /* Return true if the given character represents a digit */
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return digits.includes(char);
}

function getArrFromStr(str)
{
    /* Get an array from a string */
    return str.split("");
}

function getCharType(char)
{
    /* Get the type of character according to what concerns the calculator */
    let type = "";

    if (isPoint(char))
    {
        type = "point";
    }

    else if (isEquals(char))
    {
        type = "equals";
    }

    else if (isOperationSymbol(char))
    {
        type = "operation";
    }

    else if (isDigit(char))
    {
        type = "number";
    }

    else
    {

    }

    return type;
}

function getStrFromArr(arr)
{
    /*Get a string from an array */
    return arr.join("");
}

function getArrWithoutWhiteSpace(arr)
{
    /* Return a new array that does not contains whitespace characters */
    const newArr = [];

    for (let char of arr)
    {
        if (char !== "\n" && char !== " " && char !== "\t")
        {
            newArr.push(char);
        }
    }

    return newArr;
}

function roundToTwoDigits(num)
{
    /*Round this number to two decimal places */
    return Math.round(num * 100) / 100;
}

document.addEventListener("DOMContentLoaded", main);