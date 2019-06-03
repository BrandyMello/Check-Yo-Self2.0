class ToDoList {
  constructor(list) {
    this.id = list.id;
    this.title = list.title; //string
    this.urgent = list.urgent; //boolean
    this.tasks = list.tasks; //array of objects
  }

 
  saveToStorage(cardsArray) {
    localStorage.setItem('todos', JSON.stringify(cardsArray));
  }

  deleteFormStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }
}

class TaskItem {
  constructor(items) {
    this.items = items;
    this.checked = false;
  }

  updateCheck() {

  }
}