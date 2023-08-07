let sfxAllowed = false;

function main()
{
    // Grab DOM elements that need only one reference

    // DOM elements to animate
    const h1Header = document.querySelector("header > h1");
    const gitHubIconLink = document.querySelector(".footer-content > a");
    const buttons = Array.from(document.querySelectorAll(".button"));

    // DOM elements to play SFX with
    const sfxButton = document.querySelector("button#sfx-button");
    const devUsername = document.querySelector(".footer-content > h2");
    const sfxImage = document.querySelector("img#sfx-icon");

    // DOM elements relevant for the calculator
    const operationPreviewDiv = document.querySelector(".operation-preview");
    const resultPreviewDiv = document.querySelector(".result-preview");

    // Grab Specific Buttons
    const clearBtn = getButtonByClassName(buttons, "clear");
    const deleteBtn = getButtonByClassName(buttons, "delete");

    // Add animation to each element
    const buttonsAnimations = buttons.map(button => {
        return {
            element: button,
            className: "animate__pulse"
        }
    });

    const animatedElementsNAnimations = [
        {
            element: h1Header,
            className: "animate__pulse"
        },
        {
            element: gitHubIconLink,
            className: "animate__shakeX"
        }
        ,...buttonsAnimations
    ];

    // Add SFX to each required element
    const buttonsSFXForClick = buttons.map(button => {

        if (button.classList.contains("clear"))
        {
            return {
                element: button,
                sfxPath: "assets/audio/sfx/on.wav",
                event: "click"
            }
        }

        else if (button.classList.contains("delete"))
        {
            return {
                element: button,
                sfxPath: "assets/audio/sfx/error.wav",
                event: "click"
            }
        }

        else if (button.classList.contains("equals"))
        {
            return null;
        }

        else
        {
            return {
                element: button,
                sfxPath: "assets/audio/sfx/click.wav",
                event: "click"
            }
        }
    });

    const elementsSFXForClick = [
        {
            element: sfxButton,
            sfxPath: "assets/audio/sfx/on.wav",
            event: "click"
        },
        {
            element: gitHubIconLink,
            sfxPath: "assets/audio/sfx/on.wav",
            event: "click"
        },
        {
            element: devUsername,
            sfxPath: "assets/audio/sfx/on.wav",
            event: "click"
        },
        ...buttonsSFXForClick
    ];

    const buttonsSFXForHover = buttons.map(button => {
        return {
            element: button,
            sfxPath: "assets/audio/sfx/hover.wav",
            event: "mouseover"
        };
    });

    const elementsSFXForHover = [
        {
            element: h1Header,
            sfxPath: "assets/audio/sfx/hover.wav",
            event: "mouseover"
        },
        {
            element: gitHubIconLink,
            sfxPath: "assets/audio/sfx/hover.wav",
            event: "mouseover"
        },
        {
            element: devUsername,
            sfxPath: "assets/audio/sfx/hover.wav",
            event: "mouseover"
        },
        ...buttonsSFXForHover
    ];

    const allElementsWithEventsAndSFX = [...elementsSFXForHover, ...elementsSFXForClick];

    // Add dynamic animations to animation elements
    implementAnimations(animatedElementsNAnimations);

    // Add SFX functionality
    implementSFX(allElementsWithEventsAndSFX);

    // Switch SFX on/off as required
    sfxButton.addEventListener("click", () => toggleSFX(sfxImage));

    // Clear the calculator
    clearBtn.addEventListener("click", () => clearCalculator(operationPreviewDiv, resultPreviewDiv));

}

/* Event Handlers */
function toggleSFX(btnIcon)
{
    if (sfxAllowed)
    {
        sfxAllowed = false;
        btnIcon.src = "assets/pics/sound-off.png";
    }

    else
    {
        sfxAllowed = true;
        btnIcon.src = "assets/pics/sound-on.png";
    }
}

function clearCalculator(operationPreview, resultPreview)
{
    /* Clear the calculator */
    operationPreview.textContent = "";
    resultPreview.textContent = 0;
}

/* Helpers */
function implementAnimations(elementsNClassNames)
{
    /* implement animations to required elements */
    elementsNClassNames.forEach(elementNClassName => {

        // Destructure the given object of element and animation className
        const { element, className } = elementNClassName;

        // Add event listener of mouse enter to add the animation
        element.addEventListener("mouseenter", () => {
            addClassIfAbsent(element, className);
        });

        // Add infinite animation while mouse is over the element
        element.addEventListener("mouseover", () => {
            addClassIfAbsent(element, "animate__infinite");
        });

        // Remove all animations when the mouse leaves the element
        element.addEventListener("mouseleave", () => {
            removeClassIfPresent(element, className);
            removeClassIfPresent(element, "animate__infinite");
        });

        // Remove all animations when the element is clicked as well
        element.addEventListener("click", () => {
            removeClassIfPresent(element, className);
            removeClassIfPresent(element, "animate__infinite");
        });

    });

}

function implementSFX(elementsWithEventsNSFX)
{
    /*Associate SFX to event listeners of given elements */
    elementsWithEventsNSFX.forEach(elementWithEventNSFX => {

        if (elementWithEventNSFX !== null)
        {
            const { element, sfxPath, event } = elementWithEventNSFX;
            element.addEventListener(event, () => {
                playSFX(sfxPath);
            });
        }
    });
}

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

function playSFX(sfxPath)
{
    /* Play an SFX when allowed */
    if (sfxAllowed)
    {
        const sfxToPlay = new Audio(sfxPath);
        sfxToPlay.play();
    }
}

function getButtonByClassName(buttonsArray, className)
{
    /* Return the button that contains the specific className */
    for (let button of buttonsArray)
    {
        if (button.classList.contains(className))
        {
            return button;
        }
    }
}

function getButtonsByType(buttonsArray, buttonTypeChecker)
{
    /* Return an array of buttons that belong to a specific type */
    const buttonsOfType = [];

    for (let button of buttonsArray)
    {
        if (buttonTypeChecker(button))
        {
            buttonsOfType.push(button);
        }
    }

    return buttonsOfType;
}

function isSpecialButton(button)
{
    /* Return true if the given button is clear or delete */
    return button.classList.contains("clear") || button.classList.contains("delete");
}

function isPointButton(button)
{
    /* Return true if the given button is the point button */
    return button.classList.contains("point");
}

function isOperationButton(button)
{
    /* Return true if the given button represents an arithmetical operation */
    return button.classList.contains("plus") || button.classList.contains("minus") || button.classList.contains("product") || button.classList.contains("multiply");
}

document.addEventListener("DOMContentLoaded", main);