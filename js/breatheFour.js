
var secondsFour = 3; // seconds for HTML
var count = 0;

function redirectFour() {
    document.location.href = 'breathe-up5.html';
}

function updateSecsFour() {
    document.getElementById("four").innerHTML = secondsFour;
    secondsFour--;
    if (secondsFour == -1) {
        clearInterval(foo);
        redirectFour();
    }
}


function countdownTimerFour() {
    foo = setInterval(function () {
        updateSecsFour()
    }, 1000);
}

countdownTimerFour();
