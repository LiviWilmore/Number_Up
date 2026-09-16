
const element = document.getElementById("incrementText");

// Make the number as large as possible while keeping it inside the screen
function updateFontSize() {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.8;

    let fontSize = Math.min(window.innerWidth, window.innerHeight);
    element.style.fontSize = fontSize + "px";

    while (
        (element.getBoundingClientRect().width > maxWidth ||
         element.getBoundingClientRect().height > maxHeight) &&
        fontSize > 10
    ) {
        fontSize -= 2;
        element.style.fontSize = fontSize + "px";
    }
}


// Load saved value when page opens
window.onload = function() {
    const savedNumber = localStorage.getItem("number");

    if (savedNumber !== null) {
        element.textContent = savedNumber;
    }

    updateFontSize();
};


function incrementButton() {
    if (event.repeat) return;
    let value = Number(element.textContent);

    value++;

    element.textContent = value;

    // Save updated value
    localStorage.setItem("number", value);

    // Resize the number
    updateFontSize();
}


let oPresses = 0;

document.onkeydown = function(event) {
    // Don't count held-down keys repeatedly
    if (event.repeat) return;

    // Press O three times to reset
    if (event.key.toLowerCase() === "o") {
        oPresses++;

        if (oPresses === 3) {
            element.textContent = "0";
            element.setAttribute("data-number", "0");
            localStorage.setItem("number", 0);

            oPresses = 0;
            updateFontSize();
            return;
        }
    } else {
        // Any other key breaks the O sequence
        oPresses = 0;
    }

    incrementButton(event);
};

// Resize the number if the browser window changes size
window.addEventListener("resize", updateFontSize);
