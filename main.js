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
display.addEventListener('click', handleDisplayEvents);

addItem.disabled = true;
makeListBtn.disabled = true;
clearListBtn.disabled = true;

window.onload = function() {
  reloadLists();
}

function handleDisplayEvents(e) {
  if (e.target.className === 'card__li--unchecked') {
    findCardIndex(e);
    findTask(e);
    checkOffItem(e);
  }
  if (e.target.className === 'rt__img--delete') {
    findCard(e);
    deleteCard(e);
  }
  if (e.target.className === 'rt__img--urgent') {
    makeUrgent(e);
  }
}

function findCard(e) {
  var cardId = e.target.closest('.rt__article--card').getAttribute('data-id');
  return lists.find(function(item) {
  return item.id === parseInt(cardId);
  });
}

function makeUrgent(e) {
  var card = findCard(e);
  var cardStyle = e.target.closest('article');
  card.updateToDo();
  var urgentImg = 'graphics/urgent-active.svg';
  var notUrgentImg = 'graphics/urgent.svg';
  if (card.urgent === true) {
    e.target.src = urgentImg;
    styleUrgentCard(e, card);
  } 
  if (card.urgent === false) {
    e.target.src = notUrgentImg;
    styleUrgentCard(e, card);
  }
}

function styleUrgentCard(e, card) {
  var cardStyle = e.target.closest('article');
  var h2Style = cardStyle.querySelector('h2');
  var footerStyle = e.target.closest('footer');
  var pStyle = footerStyle.querySelector('p');
  if (card.urgent === true) {
    cardStyle.classList.add('change-card');
    h2Style.classList.add('change-card-h2');
    footerStyle.classList.add('change-card-footer');
    pStyle.classList.add('style-urgent-p');

  } 
  if (card.urgent === false) {
    cardStyle.classList.remove('change-card');
    h2Style.classList.remove('change-card-h2');
    footerStyle.classList.remove('change-card-footer');
    pStyle.classList.remove('style-urgent-p');
  }
}

function deleteCard(e) {
  var card = findCard(e);
  var cardId = card.id;
  var cardIndex = findCardIndex(e);
  var targetedCard = e.target.closest('article');
  var itemsList = lists[cardIndex].tasks;
  for (var i = 0; i < itemsList.length; i++) {
    if (itemsList[i].checked === false) {
      return
    } else {
      targetedCard.remove();
      lists[cardIndex].deleteFromStorage(cardId);
    }
  } 
}

function reloadLists() {
  var newLists = JSON.parse(localStorage.getItem('todos')) || [];
  newLists.map(function(object) {
   reInstantiateCard(object);
 });
  hideMessage();
}

function reInstantiateCard(list) {
  var newToDo = new ToDoList({id:list.id, title:list.title, urgent:list.urgent, tasks:list.tasks});
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
  <li class="list-item"><input type="image" src="graphics/delete-list-item.svg" class="form__li--delete"><span class="li__span">${task.value}</span></li>`;
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
    var taskItem = {
      id: Date.now() + 2 + i,
      item: taskList[i],
      checked: false
    };
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
  var urgentIcon = cardObj.urgent ? 'graphics/urgent-active.svg' : 'graphics/urgent.svg';
  var footerClass = cardObj.urgent ? 'change-card-footer' : '';
  var h2Style = cardObj.urgent ? 'change-card-h2' : '';
  var h2Style = cardObj.urgent ? 'change-card-h2' : '';
  var pStyle = cardObj.urgent ? 'style-urgent-p' : '';
  var cardUrgentStyle = cardObj.urgent ? 'rt__article--card change-card': 'rt__article--card';
  var taskCard = `<article class="${cardUrgentStyle}" data-id=${cardObj.id}>
          <h2 class="${h2Style}">${cardObj.title}</h2>
          <output class="rt__output--list">
            <ul class="rt__ul--list">
            ${generateList(cardObj)}
            </ul>
          </output>
          <footer class="${footerClass}">
            <div class="rt__div--urgent">
              <input type="image" src="${urgentIcon}" class="rt__img--urgent">
              <p class="${pStyle}">URGENT</p>
            </div>
            <div class="rt__div--delete">
              <input type="image" src="graphics/delete.svg" class="rt__img--delete">
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
    var checkStatus = card.tasks[i].checked ? 'checkbox-active.svg' : 'checkbox.svg';
    var spanClass = card.tasks[i].checked ? `card__span--italic` : `card__span`
    cardList += `<li class="list-item" data-id=${card.tasks[i].id}><input type="image" src="graphics/${checkStatus}" class="card__li--unchecked" ><span class="${spanClass}">${card.tasks[i].item}</span></li>`;
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
  if(targetTask.checked === true) {
    e.target.src = `graphics/checkbox-active.svg`;
    e.target.nextSibling.classList.add('card__span--italic');
} else {
    e.target.src = `graphics/checkbox.svg`;
    e.target.nextSibling.classList.remove('card__span--italic');
  }
}


