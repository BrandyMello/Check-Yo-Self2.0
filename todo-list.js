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
    // console.log('in class');
  }

  updateToDo() {

  }

  updateTask(task, cards) {
    task.checked = !task.checked;
    // console.log(task.checked);
    this.saveToStorage(cards);
  }
}
