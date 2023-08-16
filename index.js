let firstTimeUsed = true; // Boolean to check if it's the first time the calculator is used (reset to true when cleared or all digits deleted)
let currentResult = null;
let previousResult = null;

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
    currentResult = null;
    previousResult = null;
}

function removeLastNumber(operationPreview, resultPreview)
{
    /*Delete the last digit from the results preview */
    const pureOperationPreviewTextContent = getStrFromArr(getArrWithoutWhiteSpace(getArrFromStr(operationPreview.textContent)));
    const pureResultPreviewTextContent = getStrFromArr(getArrWithoutWhiteSpace(getArrFromStr(resultPreview.textContent)));


    if (pureOperationPreviewTextContent === pureResultPreviewTextContent)
    {
        operationPreview.textContent = "";
        resultPreview.textContent = "0";
        firstTimeUsed = false;
        currentResult = null;
        previousResult = null;
    }

    else
    {
        if (operationPreview.textContent.length > 0)
        {
            operationPreview.textContent = operationPreview.textContent.slice(0, -1);
        }

        else
        {
            firstTimeUsed = false;
            currentResult = null;
            previousResult = null;
        }
    }
}

function typeCalculatingBtn(e, operationPreview, resultPreview)
{
    /* Choose what to do when a calculating button is pressed */

    // Grab the text content of the clicked button
    let buttonTextContent = getArrFromStr(e.target.textContent);
    buttonTextContent = getArrWithoutWhiteSpace(buttonTextContent);
    buttonTextContent = getStrFromArr(buttonTextContent);

    // Grab the contents of the operation preview and result preview removing all whitespace
    let operationPreviewContentAsArr = getArrWithoutWhiteSpace(getArrFromStr(operationPreview.textContent));

    // Grab the type of text content
    const charType = getCharType(buttonTextContent);
    
    // Check if it's the first time the calculator is used
    if (firstTimeUsed)
    {
        // Ignore result preview since user has not executed any operation yet
        if (charType !== "equals")
        {
             // If the type of the button isn't equals then write it in the operation preview
            operationPreview.textContent = buttonTextContent;

            // Set the first time used boolean variable to false
            firstTimeUsed = false;
        }
    }

    else
    {
        // Consider result preview since user has executed one before
        if (previousResult === null)
        {
            if (charType !== "equals")
            {
                // Append the digit without spaces to the content of the operation preview
                operationPreviewContentAsArr.push(buttonTextContent);
                operationPreview.textContent = getStrFromArr(operationPreviewContentAsArr);
            }
    
            else
            {
                // Execute the operation
                currentResult = executeOperation(operationPreview.textContent);
                previousResult = currentResult;
                resultPreview.textContent = currentResult;
                operationPreview.textContent = currentResult;
    
            }
        }

        else
        {
            if (charType !== "equals")
            {
                operationPreviewContentAsArr.push(buttonTextContent);
                operationPreview.textContent = getStrFromArr(operationPreviewContentAsArr);
            }

            else
            {
                currentResult = executeOperation(operationPreview.textContent);
                previousResult = currentResult;
                resultPreview.textContent = currentResult;
                operationPreview.textContent = currentResult;
            }

        }
    }

}

function executeOperation(operationStr)
{
    /* Execute an operation on two numbers based on the operation type */

    try
    {
        let result = eval(getReadyStrForExecution(operationStr));
        return roundToTwoDigits(result);
    }

    catch (e)
    {
        return "Error";
    }
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

function getReadyStrForExecution(operationStr)
{
    let finalStr = "";

    for (let char of operationStr)
    {
        if (char === "×")
        {
            finalStr += "*";
        }

        else if (char === "÷")
        {
            finalStr += "/";
        }

        else
        {
            finalStr += char;
        }
    }

    return finalStr;
}

document.addEventListener("DOMContentLoaded", main);