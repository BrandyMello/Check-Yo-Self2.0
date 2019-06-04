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

  }

  updateTask(task, cards) {
    task.checked = !task.checked;
    this.saveToStorage(cards);
  }
}
