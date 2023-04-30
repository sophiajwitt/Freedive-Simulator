// with help from: https://foolishdeveloper.com/create-a-simple-stopwatch-using-javascript-tutorial-code/

let [milliseconds,seconds,minutes] = [0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;


// initialize on scroll
var scrollval = 0;
window.addEventListener('scroll', () => {
  console.log(window.scrollY)
  if(scrollval > window.scrollY) {
      // reset when user reaches ocean floor
      if(window.scrollY == 56250.5) {  
        clearInterval(int);
        [milliseconds,seconds,minutes] = [0,0,0];
        timerRef.innerHTML = '00 : 00';
        // window.scrollY = 0;
      }
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