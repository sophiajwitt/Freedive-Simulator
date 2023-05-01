// with help from http://jsfiddle.net/bubencode/dn6xc932/

// Countdown timer for redirecting to another URL after several seconds


// hold

var secondsTwo = 2; // seconds for HTML
var count = 0;

function redirectTwo() {
    document.location.href = 'breathe-up3.html';
}

function updateSecsTwo() {
    document.getElementById("two").innerHTML = secondsTwo;
    secondsTwo--;
    if (secondsTwo == -1) {
        clearInterval(foo);
        redirectTwo();
    }
}


function countdownTimerTwo() {
    foo = setInterval(function () {
        updateSecsTwo()
    }, 1000);
}

countdownTimerTwo();
