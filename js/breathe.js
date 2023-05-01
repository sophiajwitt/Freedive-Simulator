// with help from http://jsfiddle.net/bubencode/dn6xc932/

// Countdown timer for redirecting to another URL after several seconds

// breathe in

var secondsOne = 3; // seconds for HTML
var foo; // variable for clearInterval() function
let count = 0;

function redirectOne() {
    console.log(count);
    if (count == 2) {
        document.location.href = 'pre-dive.html';
    }
    else{
    document.location.href = 'breathe-up2.html';
    }
}

function updateSecsOne() {
    document.getElementById("one").innerHTML = secondsOne;
    secondsOne--;
    if (secondsOne == -1) {
        clearInterval(foo);
        redirectOne();
    }
}

function countdownTimerOne() {
    foo = setInterval(function () {
        updateSecsOne()
    }, 1000);
}


countdownTimerOne();
count++;