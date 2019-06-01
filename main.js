var addItem = document.querySelector('.form__input--plus');
var tempList =document.querySelector('.lft__ul--list');
var task = document.querySelector('#form--task');
var title = document.querySelector('#form--title');

// var formInputs = document.querySelectorAll('.form__input');
var makeListBtn = document.querySelector('.form__btn--make-list');
var clearListBtn = document.querySelector('.form__btn--clear-list');

var tempTaskList = [];

addItem.addEventListener('click', addTaskItem);
tempList.addEventListener('click', deleteTempItem);
task.addEventListener('keyup', enableBtns);
title.addEventListener('keyup', enableBtns);

addItem.disabled = true;
makeListBtn.disabled = true;
clearListBtn.disabled = true;

function enableBtns() {
  enablePlus();
  enableMakeListBtn();
  enableClearBtn();
}

function enablePlus() {
  if (task.value !== '' ) {
    addItem.disabled = false;
  } else {
    addItem.disabled = true;
  }
}

function enableMakeListBtn() {
  if (task.value !== '' || title.value !== '') {
    makeListBtn.disabled = false;
  } else {
    makeListBtn.disabled = true;
  }
}

function enableClearBtn() {
  if (task.value !== '' && title.value !== '') {
    clearListBtn.disabled = false;
  } else {
    clearListBtn.disabled = true;
  }
}

function addTaskItem(e) {
  e.preventDefault();
  var list = document.querySelector('.lft__ul--list');
  var taskListItem = `
  <li class="list-item"><img src="graphics/delete.svg" class="form__li--delete"><span class="li__span">${task.value}</span></li>`;
    list.insertAdjacentHTML('beforeend', taskListItem);
    tempTaskList.push(task.value);
}

function deleteTempItem(e) {
  var listItem = e.target.closest('.list-item');
  removeTempItem(listItem);
  listItem.remove();
}

function removeTempItem(item) {
  var item = tempTaskList.indexOf(item.innerText);
  tempTaskList.splice(item, 1);
}



