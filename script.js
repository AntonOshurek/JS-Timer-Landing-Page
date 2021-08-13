"use strict"

const deadlineDate = document.querySelector('.deadline__date');
const daedlineTime = document.querySelector('.deadline__time');
const setDeadlineBtn = document.querySelector('.deadline__btn');

const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

let deadline = [];

setDeadlineBtn.addEventListener('click', (e) => {
    e.preventDefault;
    if(!deadlineDate.value)  {
        inputError('enter a date!');
    } else if(Date.parse(deadlineDate.value) <= new Date().getTime()) {
        inputError('enter a future date');
    } else if (deadlineDate.value && !daedlineTime.value) {
        inputSuccess(deadlineDate.value, '0');
    } else {
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
    settimer(dateValue, timeValue); //set timer function

    deadlineDate.value = '';
    daedlineTime.value = '';
    setDeadlineBtn.innerText = 'data received';
    setTimeout(() => (setDeadlineBtn.innerText = 'set timer'), 3000);
    setDeadlineBtn.classList.remove('deadline__btn--error');
};

function pushToStorage(item) {
    localStorage.setItem('deadline', JSON.stringify(item));
};

function checkStorage() {
    if(localStorage.getItem('deadline')) {
        deadline = JSON.parse(localStorage.getItem('deadline'));
        settimer(deadline.deadDate, deadline.deadTime);
    }
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

function getZero (num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function settimer(itemDate, itemTime) {

    const msDate = Date.parse(itemDate);
    const msTime = 0;
    const fullmstime = msDate + msTime;

    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
        const t = getTime(fullmstime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
    
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    };
}