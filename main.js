var screws = 0;

function createScrew(number) {
    screws += number;
    document.getElementById("Screws").innerHTML = screws;
}