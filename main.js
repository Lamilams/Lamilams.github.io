var screws = 0;
var factories = 0;

function saveGame() {
    var saveData = {
        screws: screws,
        factories: factories
    }
    localStorage.setItem("saveData",JSON.stringify(saveData))
    document.getElementById("saveButton").innerHTML = "Saved!";
    setTimeout(function() {
        document.getElementById("saveButton").innerHTML = "Save Game";
    }, 2000);
}

function loadGame() {
    if (localStorage.getItem("saveData") == null) {}
    else {
    var saveData = JSON.parse(localStorage.getItem("saveData"));
    if (typeof saveData.screws !== "undefined") { screws = saveData.screws };
    if (typeof saveData.factories !== "undefined") { factories = saveData.factories };
    var factoryCost = Math.floor(10 * Math.pow(1.1,factories));
    document.getElementById("Factories").innerHTML = factories;
    document.getElementById("Screws").innerHTML = screws;
    document.getElementById("factoryCost").innerHTML = factoryCost;
    }
}

function confirmReset() {
    document.querySelector("#resetConfirm").style.display = "";
    document.querySelector("#resetCancel").style.display = "";
    document.querySelector("#resetButton").style.display = "none";
}

function resetCancel() {
    document.querySelector("#resetConfirm").style.display = "none";
    document.querySelector("#resetCancel").style.display = "none";
    document.querySelector("#resetButton").style.display = "";
}

function hardReset() {
    localStorage.removeItem("saveData");
    document.location.reload(true);
}

function createScrew(number) {
    screws += number;
    document.getElementById("Screws").innerHTML = screws;
}

function buyFactory() {
    var factoryCost = Math.floor(10 * Math.pow(1.1,factories)); // Calculates cost of factory
    if(screws >= factoryCost) { // Ensures player can afford a factory
        factories += 1; // Adds a factory
        screws = screws - factoryCost; // Charges player for purchasing factory
        document.getElementById("Factories").innerHTML = factories;
        document.getElementById("Screws").innerHTML = screws;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,factories));
    document.getElementById("factoryCost").innerHTML = nextCost;
}

document.addEventListener("DOMContentLoaded", function() {
    loadGame();
    document.querySelector('#resetConfirm').style.display = 'none';
    document.querySelector("#resetCancel").style.display = "none";
});


window.setInterval(function() {
    createScrew(factories);
}, 1000);

window.setInterval(function() {
    saveGame();
}, 10000);