var addItem = document.querySelector('.form__input--plus');
var tempList =document.querySelector('.lft__ul--list');
var task = document.querySelector('#form--task');
var tempTaskList = [];

addItem.addEventListener('click', addTaskItem);
tempList.addEventListener('click', deleteTempItem);
task.addEventListener('keyup', enablePlus);

addItem.disabled = true;

// function enableAddTaskBtn() {
//   var task = document.querySelector('#form--task');
//   if (task.value === "") {
//     addItem.setAttribute('disabled', 'disabled');
//   } else {
//     addItem.removeAttribute('disabled');
//   }
// }

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

function enablePlus() {
  if(task.value !== "" ) {
    addItem.disabled = false;
  }
}

