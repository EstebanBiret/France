const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 60;
const ALERT_THRESHOLD = 15;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 122;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

let remainingPathColor = COLOR_CODES.info.color;

function onTimesUp() {
  clearInterval(timerInterval);
  const event = new Event('timerEnd');
  document.dispatchEvent(event);
}

window.startTimer = function() {

  const timerElement = document.getElementById('timer');

  const attributes = timerElement.attributes;

  let ngContentAttribute = null;
  for (let i = 0; i < attributes.length; i++) {
    const attributeName = attributes[i].name;
    if (attributeName.startsWith('_ngcontent-ng')) {
      ngContentAttribute = attributes[i];
      break;
    }
  }

  timerElement.innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
    </div>
    `;

  if (ngContentAttribute) {
    const ngContentValue = ngContentAttribute.value;
    const descendants = timerElement.querySelectorAll('*');

    descendants.forEach(descendant => {
      descendant.setAttribute(ngContentAttribute.name, ngContentValue);
    });
  }

  setCircleDasharray();

  let timePassed = 2;

  timerInterval = setInterval(() => {
    timePassed = timePassed += 0.1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    if (timeLeft <= 0.0) {
      onTimesUp();
      document.getElementById("base-timer-label").innerHTML = '00.0';
    }
  }, 100);
};

function formatTime(time) {
  let seconds = Math.floor(time % 120);
  const milliseconds = Math.floor((time - Math.floor(time)) * 10);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}.${milliseconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const timeElapsed = (TIME_LIMIT - timeLeft) * 1000;
  const rawTimeFraction = (TIME_LIMIT * 1000 - timeElapsed) / (TIME_LIMIT * 1000);
  return rawTimeFraction - (1 / (TIME_LIMIT * 1000)) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

window.resetTimer = function() {
  clearInterval(timerInterval);
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  document
    .getElementById("base-timer-path-remaining")
    .classList.remove(COLOR_CODES.alert.color);
  document
    .getElementById("base-timer-path-remaining")
    .classList.remove(COLOR_CODES.warning.color);
  document
    .getElementById("base-timer-path-remaining")
    .classList.add(COLOR_CODES.info.color);
  setCircleDasharray();
  document.getElementById("base-timer-label").innerHTML = '120.0';
};