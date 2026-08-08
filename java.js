
// Load saved value when page opens
window.onload = function() {
    const savedNumber = localStorage.getItem("number");

    if (savedNumber !== null) {
        document.getElementById("incrementText").textContent = savedNumber;
    }
};

function incrementButton() {
    const element = document.getElementById("incrementText");

    let value = Number(element.textContent);

    value++;

    element.textContent = value;

    // Save updated value
    localStorage.setItem("number", value);

    

}


document.onkeydown = incrementButton;
