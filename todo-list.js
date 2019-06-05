class ToDoList {
  constructor(list) {
    this.id = list.id;
    this.title = list.title;
    this.urgent = list.urgent;
    this.tasks = list.tasks;
  }

  saveToStorage(cardsArray) {
    localStorage.setItem('todos', JSON.stringify(cardsArray));
  }

  deleteFromStorage(id) {
    var newLists = lists.filter(function(object) {
      return object.id !== parseInt(id);
    });
    lists = newLists;

    console.log(id);
    this.saveToStorage(lists);
    console.log('in class');
  }

  updateToDo() {
    this.urgent = !this.urgent;
    this.saveToStorage(lists);
  }

  updateTask(task, cards) {
    task.checked = !task.checked;
    this.saveToStorage(cards);
  }
}


