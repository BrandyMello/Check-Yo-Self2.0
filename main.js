var addItem = document.querySelector('.form__img--plus');

addItem.addEventListener('click', addTaskItem);

function addTaskItem() {
  var task = document.querySelector('#form--task');
  var list = document.querySelector('.lft__ul--list');
  var taskList = `
  <img src="graphics/checkbox.svg" class="form__li--checkbox"><li>${task.value}</li>`;
  list.insertAdjacentHTML('beforeend', taskList);
}