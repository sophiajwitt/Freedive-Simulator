// with help from http://jsfiddle.net/bubencode/dn6xc932/



var secondsOne = 3; // seconds for HTML
var foo; // variable for clearInterval() function

function redirectOne() {
    document.location.href = 'breathe-up2.html';

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
