const body = document.querySelector('body');
const stageCtn = document.querySelector('.stage-container');

stageCtn.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
        const clickedButtonText = event.target.textContent;
        document.querySelector('.stage-active').classList.remove('stage-active');
      
        switch (clickedButtonText) {
            case "pomodoro":
                event.target.classList.add('stage-active');
                break;
            case "short break":
                event.target.classList.add('stage-active');
                break;
            case "long break":
                event.target.classList.add('stage-active');
                break;
            default:
                console.log("Unknown button was clicked");
        }
    }
});


body.classList.add('ff-1')








function setProgress(progress) {
  const timerFill = document.querySelector('.timer-fill');
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (progress / 100) * circumference;
  timerFill.style.strokeDasharray = `${dashOffset} ${circumference}`;
}
setProgress(0)


/* //baseTime is in ms
const baseTime = 60000
let currentTime = 60000
let progressPercantage = currentTime / baseTime * 100; */


const time = document.querySelector('.time');

const setTime = 10000;
let baseTime = setTime
time.innerHTML = `${Math.floor(baseTime/60000)}:${Math.floor((baseTime%60000)/1000)}`
const startBtn = document.querySelector('.start-btn');
const startBtnTxt = document.querySelector('.start-btn-text');
console.log(startBtnTxt.innerHTML)

let timerStart = Date.now()
let timeElapsed = 0;

let intervalPaused = false;

startBtn.addEventListener('click', () => {
    let restart;
    if(document.querySelector('.paused')){
        console.log('test1')
        console.log('test2')
        startBtnTxt.classList.remove('paused')
        startBtnTxt.classList.add('running')
        intervalPaused = false;
        startBtnTxt.innerHTML = 'pause';
    } else if(document.querySelector('.running') && !restart){
        startBtnTxt.classList.remove('running')
        startBtnTxt.classList.add('paused')
        intervalPaused = true;
        startBtnTxt.innerHTML = 'resume';   
    }
    if(startBtnTxt.innerHTML == 'start') {
        startBtnTxt.innerHTML = 'pause';
        startBtnTxt.classList.add('running')
        
            const elapsedTime = setInterval(() => {
                restart = false;
                if(document.querySelector('.running')) {
                    const millis = Date.now() - timerStart - 1000
                    console.log(millis)
                    if(millis < baseTime + 1000) {
                        timeElapsed = Math.floor(millis/1000) * 1000;
            
                        let outMinutes;
                        let outSeconds;
                        if(timeElapsed >= 0) {
                            const outTime = baseTime - timeElapsed;
                            outMinutes = Math.floor(outTime/60000);
                            outSeconds = Math.floor((outTime%60000)/1000);
                            time.innerHTML = `${outMinutes}:${outSeconds < 10 ? '0' : ''}${outSeconds}`;
                        }
                        
                
                        time.innerHTML = `${outMinutes}:${outSeconds < 10 ? '0' : ''}${outSeconds}`;
                
                        const progressPercantage = timeElapsed/baseTime*100;
                        setProgress(progressPercantage);
                    } else {
                        timeElapsed = 0;
                        startBtnTxt.innerHTML = 'restart';
                        clearInterval(elapsedTime);
                        console.log('Timer stopped!')
                    }
                    
                     
                }
                
            }, 1000)
        
    } else if(startBtnTxt.innerHTML == 'restart') {
        startBtnTxt.classList.add('running')
        startBtnTxt.innerHTML = 'start';
        baseTime = setTime
        timerStart = Date.now();
        const outTime = baseTime - timeElapsed;
        outMinutes = Math.floor(outTime/60000);
        outSeconds = Math.floor((outTime%60000)/1000);
        time.innerHTML = `${outMinutes}:${outSeconds < 10 ? '0' : ''}${outSeconds}`;
        const progressPercantage = timeElapsed/baseTime*100;
        setProgress(progressPercantage);
        restart = true;
    } 
})


