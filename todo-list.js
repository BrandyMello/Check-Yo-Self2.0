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
    this.urgent = !this.urgent;
    this.saveToStorage(lists);
  }

  updateTask(task, cards) {
    task.checked = !task.checked;
    this.saveToStorage(cards);
  }
}

function updateStar(e, id) {
  var starToUpdate = e.target;
  var activeStar = 'images/star-active.svg';
  var inactiveStar = 'images/star.svg';
  if (ideaList[id].star === true) {
    starToUpdate.src = activeStar;
  } else {
    starToUpdate.src = inactiveStar;
  }
}

function triggerStar(e) {
    if (e.target.id === 'card__img--star') {
      var index = findKey(e);
      ideaList[index].star = !ideaList[index].star;
      ideaList[index].updateIdea(ideaList[index].title, ideaList[index].body, ideaList[index].star);
      updateStar(e, index);
    }
  }

