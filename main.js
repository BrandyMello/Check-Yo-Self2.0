var addItem = document.querySelector('.form__img--plus');
var tempList =document.querySelector('.lft__ul--list');

addItem.addEventListener('click', addTaskItem);
tempList.addEventListener('click', deleteTempItem);

function addTaskItem() {
  var task = document.querySelector('#form--task');
  var list = document.querySelector('.lft__ul--list');
  var taskList = `
  <li class="list-item"><img src="graphics/delete.svg" class="form__li--delete"><span class="li__span">${task.value}</span></li>`;
  list.insertAdjacentHTML('beforeend', taskList);
}

function deleteTempItem(e) {
  var listItem = e.target.closest('.list-item');
  listItem.remove();
}