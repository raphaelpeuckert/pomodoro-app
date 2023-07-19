const body = document.querySelector('body');
body.classList.add('ff-1');

const timerCtnOuter = document.querySelector('.timer-container-outer');

window.addEventListener('resize', () => {
    const timerWidth = timerCtnOuter.offsetWidth;
    timerCtnOuter.style.height = timerWidth;
})

const stageCtn = document.querySelector('.stage-container');
let activePage = 'pomodoro';

stageCtn.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
        const clickedButtonText = event.target.textContent;
        document.querySelector('.stage-active').classList.remove('stage-active');
      
        switch (clickedButtonText) {
            case "pomodoro":
                event.target.classList.add('stage-active');
                activePage = 'pomodoro'
                baseVal = document.getElementById(activePage).value;
                baseTime(baseVal);
                paused = true;
                setProgress(0);
                break;
            case "short break":
                event.target.classList.add('stage-active');
                activePage = 'short-break'
                baseVal = document.getElementById(activePage).value;
                baseTime(baseVal);
                paused = true;
                setProgress(0);
                break;
            case "long break":
                event.target.classList.add('stage-active');
                activePage = 'long-break'
                baseVal = document.getElementById(activePage).value;
                baseTime(baseVal);
                paused = true;
                setProgress(0);
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

let initialBaseValMs;
let baseValMs; 
let percentValue;
let paused = false;

function baseTime(inputMinutes){
    let baseSeconds = 0
    let baseMinutes = inputMinutes;
    timerOutEl.innerText = baseMinutes.toString().padStart(2, '0') + ":" + baseSeconds.toString().padStart(2, '0');
    initialBaseValMs = baseVal * 60000;
    baseValMs = baseVal * 60000;
    percentValue = 0;
}


const timerOutEl = document.querySelector('.time');

let baseVal = document.getElementById('pomodoro').value;
baseTime(baseVal)

function timer() {
    if(!paused && baseValMs > 0) {
        percentValue += 1000;
        baseValMs -= 1000;
        let progressPercentage = percentValue*100/initialBaseValMs
        setProgress(progressPercentage)
        convertToOutputTime();
    } else {
        startBtnText.innerText = 'restart';
        clearInterval(timerInterval);
    }
}

let startBtnText = document.querySelector('.start-btn-text');

function toggleInterval() {
    switch(startBtnText.innerText) {
        case 'START':
            startInterval();
            startBtnText.innerText = 'PAUSE'
            break;
        case 'PAUSE':
            clearInterval(timerInterval)
            startBtnText.innerText = 'RESUME'
            break;
        case 'RESUME':
            startInterval();
            startBtnText.innerText = 'PAUSE'
            break;
        case 'RESTART':
            startBtnText.innerText = 'START'
            baseVal = document.getElementById(activePage).value;
            baseTime(baseVal);
            paused = true;
            setProgress(0);
            break;
    }
}

function startInterval(){
    if(paused) {
        paused = false;
        timerInterval = setInterval(timer, 1000);
    } else {
        timerInterval = setInterval(timer, 1000);
    }
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

function convertToOutputTime(){
    let outSeconds = Math.floor(baseValMs%60000)/1000;
    let outMinutes = Math.floor(baseValMs/60000)%1000;
    timerOutEl.innerText = outMinutes.toString().padStart(2, '0') + ":" + outSeconds.toString().padStart(2, '0');
}

const settingsOverlay = document.querySelector('.settings-overlay');
const settingsPopup = document.querySelector('#settings-popup');
const settingsCloseBtn = document.querySelector('.settings-close-btn');

let settingsOpen = false;

function toggleSettings() {
    if(!settingsOpen) {
        baseTime(baseVal);
        settingsOpen = true;
        settingsOverlay.style.display = 'block';
        settingsPopup.style.display = 'block';
    }  else {
        settingsOpen = false;
        settingsOverlay.style.display = 'none';
        settingsPopup.style.display = 'none';
        baseVal = document.getElementById(activePage).value;
        baseTime(baseVal);
        paused = true;
        setProgress(0);
    }
};

document.querySelector('.apply-btn-ctn').addEventListener('click', function(e) {e.preventDefault()});

const fontGroup = document.querySelector('.font-selector-group');

fontGroup.addEventListener("click", (event) => {
    if (event.target.nodeName === "SPAN") {
        const body = document.querySelector('body')
        const clickedFont = event.target.classList;
        document.querySelector('.font-active').classList.remove('font-active');
        
        if(clickedFont.contains('ff-1')) {
            clickedFont.add('font-active');
            body.classList.add('ff-1');
            body.classList.remove('ff-2', 'ff-3')
        } else if(clickedFont.contains('ff-2')) {
            clickedFont.add('font-active');
            body.classList.add('ff-2');
            body.classList.remove('ff-1', 'ff-3')
        } else if(clickedFont.contains('ff-3')) {
            clickedFont.add('font-active');
            body.classList.add('ff-3');
            body.classList.remove('ff-1', 'ff-2')
        }
        
        }
    }
);


const colorGroup = document.querySelector('.color-selector-group');

colorGroup.addEventListener("click", (event) => {
    if (event.target.nodeName === "SPAN") {
        const body = document.querySelector('body')
        const clickedColor = event.target;  
        
        if(clickedColor.classList.contains('bg-red')) {
            clickedColor.innerHTML = '&#10004;';
            document.querySelector('#clr-blue').innerHTML = '';
            document.querySelector('#clr-purple').innerHTML = '';
            document.querySelector(':root').style.setProperty('--active-color', 'var(--red)');
        } else if(clickedColor.classList.contains('bg-blue')) {
            clickedColor.innerHTML = '&#10004;';
            document.querySelector('#clr-red').innerHTML = '';
            document.querySelector('#clr-purple').innerHTML = '';
            document.querySelector(':root').style.setProperty('--active-color', 'var(--blue)');
        } else if(clickedColor.classList.contains('bg-purple')) {
            clickedColor.innerHTML = '&#10004;';
            document.querySelector('#clr-red').innerHTML = '';
            document.querySelector('#clr-blue').innerHTML = '';
            document.querySelector(':root').style.setProperty('--active-color', 'var(--purple)');
        }
        
        }
    }
);
