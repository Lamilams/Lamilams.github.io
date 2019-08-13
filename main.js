var screws = 0;
var factories = 0;

function saveGame() {
    var saveData = { // Values that need to be stored
        screws: screws,
        factories: factories
    }
    localStorage.setItem("saveData",JSON.stringify(saveData)) // JSON.Stringify changes the JS array into a string for use with localStorage
    document.getElementById("saveButton").innerHTML = "Saved!"; // Change save button text to inform player a save has just happened
    setTimeout(function() { // Wait 2 seconds then change text back to Save Game
        document.getElementById("saveButton").innerHTML = "Save Game";
    }, 2000);
}

function loadGame() {
    if (localStorage.getItem("saveData") == null) {} // Check to see if a save file exists, if not this does nothing
    else {
    var saveData = JSON.parse(localStorage.getItem("saveData")); // Pull save from localStorage and convert it back into a JS array
    if (typeof saveData.screws !== "undefined") { screws = saveData.screws }; // If screws is not saved, change nothing, if it is saved, set screws to this value in the active game
    if (typeof saveData.factories !== "undefined") { factories = saveData.factories }; // Same as above but for factories
    var factoryCost = Math.floor(10 * Math.pow(1.1,factories)); // Check the current factory cost based on the amount owned
    document.getElementById("Factories").innerHTML = factories; // Display all above data in the correct game sections
    document.getElementById("Screws").innerHTML = screws; // Display all above data in the correct game sections
    document.getElementById("factoryCost").innerHTML = factoryCost; // Display all above data in the correct game sections
    }
}

function confirmReset() { // This is used for two buttons to appear after you click Hard Reset
    document.querySelector("#resetConfirm").style.display = ""; // Makes the Confirm button appear
    document.querySelector("#resetCancel").style.display = ""; // Makes the Cancel button appear
    document.querySelector("#resetButton").style.display = "none"; // Makes the Hard Reset button disappear
}

function resetCancel() { // This is used to cancel the reset after clicking Hard Reset
    document.querySelector("#resetConfirm").style.display = "none"; // Makes the Confirm button disappear
    document.querySelector("#resetCancel").style.display = "none"; // Makes the Cancel button disappear
    document.querySelector("#resetButton").style.display = ""; // Makes the Hard Reset button appear
}

function hardReset() { // This will remove existing save data and force reload the page
    localStorage.removeItem("saveData");
    document.location.reload(true);
}

function createScrew(number) { // Basic screw creator
    screws += number; // Add the given number to the variable screws
    document.getElementById("Screws").innerHTML = screws; // Updates value on front end so player can see
}

function buyFactory() {
    var factoryCost = Math.floor(10 * Math.pow(1.1,factories)); // Calculates cost of factory
    if(screws >= factoryCost) { // Ensures player can afford a factory
        factories += 1; // Adds a factory
        screws = screws - factoryCost; // Charges player for purchasing factory
        document.getElementById("Factories").innerHTML = factories; // Updates value on front end so player can see
        document.getElementById("Screws").innerHTML = screws; // Updates value on front end so player can see
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,factories)); // Calculates cost of next factory
    document.getElementById("factoryCost").innerHTML = nextCost; // Updates value on front end so player can see
}

document.addEventListener("DOMContentLoaded", function() { // Checks to see if page is loaded then runs all contained code
    loadGame(); // Loads a previous save if one exists
    document.querySelector('#resetConfirm').style.display = 'none'; // Hides second tier button
    document.querySelector("#resetCancel").style.display = "none"; // Hides second tier button
});


window.setInterval(function() { // This is the game tickrate, all contained functions will happen at the defined interval
    createScrew(factories); // Gives the player screws each tick based on their number of owned factories
}, 1000); // Tickrate

window.setInterval(function() { // This is a 10 second tick, designed for auto-saving
    saveGame(); // Saves the game
}, 10000); // Tickrate