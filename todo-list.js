class ToDoList {
  constructor(list) {
    this.id = list.id;
    this.title = list.title; //string
    this.urgent = list.urgent; //boolean
    this.tasks = list.tasks; //array of objects
  }

  saveToStorage() {

  }

  deleteFormStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }

  // get id() {
  //   return this.id;
  // }
}

class TaskItem {
  constructor(items) {
    this.items = items;
  }
}