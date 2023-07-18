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

const increaseButtons = document.querySelectorAll('.increase-timer-btn');
const decreaseButtons = document.querySelectorAll('.decrease-timer-btn');
for(let increaseBtn of increaseButtons) {
    increaseBtn.addEventListener('click', preventDefault);
};
for(let decreaseBtn of decreaseButtons) {
    decreaseBtn.addEventListener('click', preventNegative);
};
function preventDefault(e) {
    e.preventDefault();
}

function preventNegative(e) {
    preventDefault(e);
    switch(e.target.id) {
        case 'pomodoro-down':
            if(Number(document.getElementById('pomodoro').value) <= 0) {
                document.getElementById('pomodoro').value = 0
            }
        case 'short-break-down':
            if(Number(document.getElementById('short-break').value) <= 0) {
                document.getElementById('short-break').value = 0
            }
        case 'long-break-down':
            if(Number(document.getElementById('long-break').value) <= 0) {
                document.getElementById('long-break').value = 0
            }

    }
}


function setProgress(progress) {
    const timerFill = document.querySelector('.timer-fill');
    const circumference = 2 * Math.PI * 45;
    const dashOffset = circumference - (progress / 100) * circumference;
    timerFill.style.strokeDasharray = `${dashOffset} ${circumference}`;
}
setProgress(0)


const timerOutEl = document.querySelector('.time');
const startBtnText = document.querySelector('.start-btn-text').innerText;

let baseVal = 1;

let initialBaseValMs = baseVal * 60000;
let baseValMs = baseVal * 60000;
let percentValue = 0;

let paused = false;

function timer() {
    if(!paused && baseValMs > 0) {
        percentValue += 1000;
        baseValMs -= 1000;
        let progressPercentage = percentValue*100/initialBaseValMs
        setProgress(progressPercentage)
        convertToOutputTime();
    } else {
        clearInterval(timer);
    }
}

function startInterval(){
    setInterval(timer, 1000);
} 

function pauseTimer(){
    paused = true;
    startBtnText = 'resume'
}

function resumeTimer(){
    paused = false;
}

function restartTimer(){
    paused = false;
}

convertToOutputTime();

function convertToOutputTime(){
    let outSeconds = Math.floor(baseValMs%60000)/1000;
    let outMinutes = Math.floor(baseValMs/60000)%1000;
    timerOutEl.innerText = outMinutes.toString().padStart(2, '0') + ":" + outSeconds.toString().padStart(2, '0');
}


body.classList.add('ff-1');



