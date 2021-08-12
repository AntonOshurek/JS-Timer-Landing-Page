"use strict"

const deadlineDate = document.querySelector('.deadline__date');
const daedlineTime = document.querySelector('.deadline__time');
const setDeadlineBtn = document.querySelector('.deadline__btn');

const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('seconds');

let deadline = [];

setDeadlineBtn.addEventListener('click', (e) => {
    e.preventDefault;
    if(!deadlineDate.value)  {
        inputError()
    } else if (deadlineDate.value && !daedlineTime.value) {
        inputSuccess(deadlineDate.value, '0');
    } else {
        inputSuccess(deadlineDate.value, daedlineTime.value);
    }
})

function inputError() {
    setDeadlineBtn.innerText = 'set date!';
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

function pushToStorage(dataItem) {
    localStorage.setItem('deadline', JSON.stringify(dataItem));
};

function checkStorage() {
    if(localStorage.getItem('deadline')) {
        deadline = JSON.parse(localStorage.getItem('deadline'));
    }
};
checkStorage();
