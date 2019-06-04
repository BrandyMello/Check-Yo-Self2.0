var addItem = document.querySelector('.form__input--plus');
var tempList =document.querySelector('.lft__ul--list');
var task = document.querySelector('#form--task');
var title = document.querySelector('#form--title');
var makeListBtn = document.querySelector('.form__btn--make-list');
var clearListBtn = document.querySelector('.form__btn--clear-list');
var display = document.querySelector('.rt__section--display');
var message = document.querySelector('.rt__section--message');
// var taskBubble = document.querySelector('.card__li--unchecked');
var lists = [];
var taskList = [];

addItem.addEventListener('click', addTaskItem);
tempList.addEventListener('click', deleteTempItem);
task.addEventListener('keyup', enableBtns);
title.addEventListener('keyup', enableBtns);
makeListBtn.addEventListener('click', handleMakeListBtn);
display.addEventListener('click', findCardIndex);
display.addEventListener('click', findTask);
display.addEventListener('click', checkOffItem);
// display.addEventListener('click', deleteCard);

addItem.disabled = true;
makeListBtn.disabled = true;
clearListBtn.disabled = true;

window.onload = function() {
  reloadLists();
  // console.log(lists);
}

function reloadLists() {
  var newLists = JSON.parse(localStorage.getItem('todos')) || [];
  newLists.map(function(object) {
   reInstantiateCard(object);
 });
  hideMessage();
}

//do I need to retrurn above and if so why?

function reInstantiateCard(list) {
  var newToDo = new ToDoList({id:list.id, title:list.title, urgent:false, tasks:list.tasks});
  console.log(newToDo.tasks);
  populateCard(newToDo);
  lists.push(newToDo);
  newToDo.saveToStorage(lists);
}

function enableBtns(e) {
  enablePlus(e);
  enableMakeListBtn(e);
  enableClearBtn(e);
}

function enablePlus(e) {
  if (task.value !== '' ) {
    addItem.disabled = false;
  } else {
    addItem.disabled = true;
  }
}

function enableMakeListBtn(e) {
  if (task.value === '' || title.value === '') {
    makeListBtn.disabled = true;
  } else {
    makeListBtn.disabled = false;
  }
}

function enableClearBtn(e) {
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
    enablePlus(e);
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
  enableBtns(e)
  instantiateList();
  clearForm();  
}

//Cannot get message to disappear.
//two global arrays
//do I need to return instantiateList?

function clearForm() {
  var list = document.querySelector('.lft__ul--list');
  title.value = '';
  task.value = '';
  list.innerHTML = '';
  taskList = []; 
}

function instantiateList() {
  var taskObjects = []; 
  // console.log(taskList);
  for (var i =0; i < taskList.length; i++) {
    var taskItem = {
      id: Date.now() + 2 + i,
      item: taskList[i],
      checked: false
    };
    taskObjects.push(taskItem);
  }
  instantiateCard(taskObjects);
  // console.log(taskObjects);
}

function instantiateCard(objectsArray) {
  var newToDo = new ToDoList({id:Date.now(), title: title.value, urgent: false, tasks: objectsArray});
  lists.push(newToDo);
  populateCard(newToDo);
  newToDo.saveToStorage(lists);
}

function populateCard(cardObj) {
  hideMessage();
  // console.log(cardObj);
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
  // console.log(card);
  var cardList = '';
  for (var i = 0; i < card.tasks.length; i++) {
    // console.log(card.tasks[i]);
    var checkStatus = card.tasks[i].checked ? 'checkbox-active.svg' : 'checkbox.svg';
    var spanClass = card.tasks[i].checked ? `card__span--italic` : `card__span`
    cardList += `<li class="list-item" data-id=${card.tasks[i].id}><img src="graphics/${checkStatus}" class="card__li--unchecked" ><span class="${spanClass}">${card.tasks[i].item}</span></li>`;
  }
  return cardList;
}

function findCardIndex(e) {
  var cardId = e.target.closest('article').getAttribute('data-id');
  var cardIndex = lists.findIndex(function(index) {
      return index.id === parseInt(cardId);
    });
  return cardIndex;
}

function findTask(e) {
  var itemDataAtt = e.target.closest('li').getAttribute('data-id');
  var targetCard = lists[findCardIndex(e)];
  var targetTask = targetCard.tasks.find(function(task) {
    return task.id === parseInt(itemDataAtt);
  });
  return targetTask;
}

function checkOffItem(e) {
  var targetTask = findTask(e);
  var cardIndex = findCardIndex(e);
  lists[cardIndex].updateTask(targetTask, lists);
  // lists[cardIndex].saveToStorage(lists);
  // console.log(lists)
  // console.log(lists[cardIndex]);
  if(targetTask.checked === true) {
    e.target.src = `graphics/checkbox-active.svg`;
    e.target.nextSibling.classList.add('card__span--italic');
} else {
    e.target.src = `graphics/checkbox.svg`;
    e.target.nextSibling.classList.remove('card__span--italic');
  }
}

// function deleteCard(e) {
//   checkIfCompleted(e);
// }

// function checkIfCompleted(e) {
//   console.log(e.target);
// }

