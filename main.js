var addItem = document.querySelector('.form__img--plus');

addItem.addEventListener('click', addTaskItem);

function addTaskItem() {
  var task = document.querySelector('#form--task');
  var list = document.querySelector('.lft__ul--list');
  var taskList = `
  <li><img src="graphics/checkbox.svg" class="form__li--checkbox"><span class="li__span">${task.value}</span></li>`;
  list.insertAdjacentHTML('beforeend', taskList);
}