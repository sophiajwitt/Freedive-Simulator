
let depth = document.querySelector('.depthCount');
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
  console.log(scrollval);
  currDepth = Math.round(scrollval/263);
  depth.innerHTML = currDepth;
  if (currDepth == 214) {
    document.location.href = 'finish.html'; 
  }
});



