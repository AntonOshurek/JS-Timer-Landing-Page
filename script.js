"use strict"

const deadlineDate = document.querySelector('.deadline__date');
const daedlineTime = document.querySelector('.deadline__time');
const setDeadlineBtn = document.querySelector('.deadline__btn');

const timer = document.querySelector('.timer');
const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

let timeInterval; //for settimer function

let deadline = [];

function getZero (num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

setDeadlineBtn.addEventListener('click', (e) => {
  e.preventDefault;
  if(!deadlineDate.value)  {
    inputError('enter a date!');
  } else if(Date.parse(deadlineDate.value) <= new Date().getTime()) {
    inputError('enter a future date');
  } else if (deadlineDate.value && !daedlineTime.value) {
    clearInterval(timeInterval);
    inputSuccess(deadlineDate.value, '0');
  } else {
    clearInterval(timeInterval);
    inputSuccess(deadlineDate.value, daedlineTime.value);
  }
})

function inputError(errorCode) {
  setDeadlineBtn.innerText = errorCode;
  setTimeout(() => (setDeadlineBtn.innerText = 'SET DATE!'), 3000);
  setDeadlineBtn.classList.add('deadline__btn--error');
  setTimeout(() => (setDeadlineBtn.classList.remove('deadline__btn--error')), 3000);
};

function inputSuccess(dateValue, timeValue) {
  deadline = {
    deadDate: dateValue,
    deadTime: timeValue
  };

  pushToStorage(deadline);
  deadlineDate.value = '';
  daedlineTime.value = '';
  setDeadlineBtn.innerText = 'data received';
  setTimeout(() => (setDeadlineBtn.innerText = 'set timer'), 3000);
  setDeadlineBtn.classList.remove('deadline__btn--error');
};

function pushToStorage(item) {
  localStorage.setItem('deadline', JSON.stringify(item));
  checkStorage();
};

function checkStorage() {
  if(localStorage.getItem('deadline')) {
    deadline = JSON.parse(localStorage.getItem('deadline'));
    settimer(deadline.deadDate, deadline.deadTime);
  };
};
checkStorage();

/*get time script*/

function getTime(fullmstime) {
  const t = fullmstime - Date.parse(new Date());

  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t / (1000 * 60 * 60) % 24));
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const seconds = Math.floor((t / 1000) % 60);

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
};

function settimer(itemDate, itemTime) {
  let msDate = Date.parse(itemDate);
  let msTime = 0;
  let fullmstime = msDate + msTime;

  if (itemTime != 0 && itemTime != NaN && itemTime != '') {
    msTime = getHourseTime(itemTime);
  };

  function getHourseTime(itemTime) {
    let val = itemTime.split(':');
    let hrs = +val[0];
    let min = +val[1];

    let ms = hrs * 3600000 + min * 60000;
    return ms;
  };

  timeInterval = setInterval(updateClock, 1000);
  updateClock();

  function updateClock() {
    const t = getTime(fullmstime);

    days.innerText = getZero(t.days);
    hours.innerText = getZero(t.hours);
    minutes.innerText = getZero(t.minutes);
    seconds.innerText = getZero(t.seconds);

    if (t.total <= 0) {
      clearInterval(timeInterval);
      timer.innerHTML = `<p class='timer__dead'>your timer ${deadline.deadDate} is ... dead</p>`;
    }
  };

  const clearBtn = document.querySelector('.deadline__clear-btn');
  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearBtn.innerText = 'Timer is clear';
    setTimeout(() => (clearBtn.innerText = 'clear timer'), 3000);
    fullmstime = 0;
    clearInterval(timeInterval);
    localStorage.removeItem('deadline');

    days.innerText = '00';
    hours.innerText = '00';
    minutes.innerText = '00';
    seconds.innerText = '00';
  });
};
