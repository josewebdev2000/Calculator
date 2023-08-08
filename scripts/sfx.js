// Script solely concerned with SFX

let sfxAllowed = false; // Boolean to check if SFX are allowed or not

function mainForSFX()
{
    // DOM elements to play SFX with
    const gitHubIconLink = document.querySelector(".footer-content > a");
    const h1Header = document.querySelector("header > h1");
    const sfxButton = document.querySelector("button#sfx-button");
    const devUsername = document.querySelector(".footer-content > h2");
    const sfxImage = document.querySelector("img#sfx-icon");
    const buttons = Array.from(document.querySelectorAll(".button"));

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

        // Add SFX functionality
        implementSFX(allElementsWithEventsAndSFX);

        // Switch SFX on/off as required
        sfxButton.addEventListener("click", () => toggleSFX(sfxImage));

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

/* Helpers */
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

function playSFX(sfxPath)
{
    /* Play an SFX when allowed */
    if (sfxAllowed)
    {
        const sfxToPlay = new Audio(sfxPath);
        sfxToPlay.play();
    }
}

document.addEventListener("DOMContentLoaded", mainForSFX);