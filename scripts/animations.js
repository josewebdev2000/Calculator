// Script solely concerned with animations

function mainForAnimations()
{
    // DOM elements to animate
    const h1Header = document.querySelector("header > h1");
    const buttons = Array.from(document.querySelectorAll(".button"));

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
        ,...buttonsAnimations
    ];

     // Add dynamic animations to animation elements
     implementAnimations(animatedElementsNAnimations);

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

document.addEventListener("DOMContentLoaded", mainForAnimations);