var addItem = document.querySelector('.form__input--plus');
var tempList =document.querySelector('.lft__ul--list');
var task = document.querySelector('#form--task');
var title = document.querySelector('#form--title');
var makeListBtn = document.querySelector('.form__btn--make-list');
var clearListBtn = document.querySelector('.form__btn--clear-list');
var display = document.querySelector('.rt__section--display');
var tempTaskList = [];

addItem.addEventListener('click', addTaskItem);
tempList.addEventListener('click', deleteTempItem);
task.addEventListener('keyup', enableBtns);
title.addEventListener('keyup', enableBtns);
makeListBtn.addEventListener('click', handleMakeListBtn);

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

function handleMakeListBtn(e) {
  e.preventDefault();
  instantiateCardList();
  // populateCard(); 
}

function instantiateCardList() {
  var taskObjects = []; 
  for (var i =0; i < tempTaskList.length; i++) {
    var taskItem = new TaskItem(tempTaskList[i]);
    taskObjects.push(taskItem);
  }

  // populateCard(taskObjects);
  return taskObjects;
}

// function populateCard() {
//   var taskCard = `<article class="rt__aricle--card" data-id=>
//           <h2>${title.value}</h2>
//           <output class="rt__output--list">
//             <ul class="rt__ul--list"> 
//             </ul>
//           </output>
//           <footer>
//             <div class="rt__div--urgent">
//               <img src="graphics/urgent.svg" class="rt__img--urgent">
//               <p>URGENT</p>
//             </div>
//             <div class="rt__div--delete">
//               <img src="graphics/delete.svg" class="rt__img--delete">
//             <p>DELETE</p>  
//             </div> 
//           </footer>       
//         </article>`;
//   display.insertAdjacentHTML('afterbegin', taskCard);
// }

