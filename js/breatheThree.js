// breathe out

var secondsThree = 7; // seconds for HTML

function redirectThree() {
    document.location.href = 'breathe-up4.html';
}

function updateSecsThree() {
    document.getElementById("three").innerHTML = secondsThree;
    secondsThree--;
    count = 1;
    if (secondsThree == -1) {
        clearInterval(foo);
        redirectThree();
    }
}

function countdownTimerThree() {
    foo = setInterval(function () {
        updateSecsThree()
    }, 1000);
}

countdownTimerThree();