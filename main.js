var addItem = document.querySelector('.form__input--plus');
var tempList =document.querySelector('.lft__ul--list');
var task = document.querySelector('#form--task');
var title = document.querySelector('#form--title');
var makeListBtn = document.querySelector('.form__btn--make-list');
var clearListBtn = document.querySelector('.form__btn--clear-list');
var display = document.querySelector('.rt__section--display');
var message = document.querySelector('.rt__section--message');
var lists = [];
var taskList = [];

addItem.addEventListener('click', addTaskItem);
tempList.addEventListener('click', deleteTempItem);
task.addEventListener('keyup', enableBtns);
title.addEventListener('keyup', enableBtns);
makeListBtn.addEventListener('click', handleMakeListBtn);

addItem.disabled = true;
makeListBtn.disabled = true;
clearListBtn.disabled = true;

window.onload = function() {
  reloadLists();
}

function reloadLists() {
  var newLists = JSON.parse(localStorage.getItem('todos')) || [];
  newLists.map(function(object) {
   reInstantiateCard(object);
 });
  hideMessage();
}

function reInstantiateCard(list) {
  var newToDo = new ToDoList({id:list.id, title:list.title, urgent:false, tasks:list.tasks});
  populateCard(newToDo);
  lists.push(newToDo);
  newToDo.saveToStorage(lists);
}

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
  <li class="list-item"><img src="graphics/delete-list-item.svg" class="form__li--delete"><span class="li__span">${task.value}</span></li>`;
    list.insertAdjacentHTML('beforeend', taskListItem);
    taskList.push(task.value);
    task.value = '';
}

function deleteTempItem(e) {
  var listItem = e.target.closest('.list-item');
  removeTempItem(listItem);
  listItem.remove();
}

function removeTempItem(item) {
  var item = taskList.indexOf(item.innerText);
  taskList.splice(item, 1);
}

function handleMakeListBtn(e) {
  e.preventDefault();
  instantiateList();
  clearForm();  
}

//Cannot get message to disappear.
//two global arrays

function clearForm() {
  var list = document.querySelector('.lft__ul--list');
  title.value = '';
  task.value = '';
  list.innerHTML = '';
  taskList = []; 
}

function instantiateList() {
  var taskObjects = []; 
  for (var i =0; i < taskList.length; i++) {
    var taskItem = new TaskItem(taskList[i]);
    taskObjects.push(taskItem);
  }
  instantiateCard(taskObjects);
}

function instantiateCard(objectsArray) {
  var newToDo = new ToDoList({id:Date.now(), title: title.value, urgent: false, tasks: objectsArray});
  lists.push(newToDo);
  populateCard(newToDo);
  newToDo.saveToStorage(lists);
}

function populateCard(cardObj) {
  hideMessage();
  var taskCard = `<article class="rt__aricle--card" data-id=${cardObj.id}>
          <h2>${cardObj.title}</h2>
          <output class="rt__output--list">
            <ul class="rt__ul--list">
            ${generateList(cardObj)}
            </ul>
          </output>
          <footer>
            <div class="rt__div--urgent">
              <img src="graphics/urgent.svg" class="rt__img--urgent">
              <p>URGENT</p>
            </div>
            <div class="rt__div--delete">
              <img src="graphics/delete.svg" class="rt__img--delete">
            <p>DELETE</p>  
            </div> 
          </footer>       
        </article>`;
  display.insertAdjacentHTML('afterbegin', taskCard);
}

function hideMessage() {
  if (lists.length > 0) {
    message.classList.add('hidden');
  } else {
    message.classList.remove('hidden');
  }
}

function generateList(card) {
  var cardList = '';
  for (var i = 0; i < card.tasks.length; i++) {
    cardList += `<li class="list-item"><img src="graphics/checkbox.svg" class="card__li--unchecked"><span class="card__span">${card.tasks[i].items}</span></li>`;
  }
  return cardList;
}

