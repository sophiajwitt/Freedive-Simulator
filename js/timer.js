// with help from: https://foolishdeveloper.com/create-a-simple-stopwatch-using-javascript-tutorial-code/

let [milliseconds,seconds,minutes] = [0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let totalTime = document.querySelector('.descendTime');
let int = null;


// initialize on scroll
var scrollval = 0;
window.addEventListener('scroll', () => {
  if(scrollval > window.scrollY) {
    console.log(window.scrollY)
  } 
  else {
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
  }
  scrollval = window.scrollY;
});



// timer function

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
 let m = minutes < 10 ? '0' + minutes : minutes;
 let s = seconds < 10 ? '0' + seconds : seconds;
 let ms = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
 timerRef.innerHTML = ` ${m} : ${s} `;
}

// https://techstacker.com/javascript-detect-when-scrolled-to-bottom/

window.onscroll = function() {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
       clearInterval(int);
       localStorage.setItem("timerRef", JSON.stringify(timerRef));
       console.log(timerRef)
       document.location.href = 'finish.html'; 
       var descend = JSON.parse(localStorage.getItem("timerRef"));
       totalTime.innerHTML = descend;
       }
   }

  