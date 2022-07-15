const taskInput = document.querySelector('.input-container');
const taskHandler = document.querySelector('.todo-input');
const UI = document.querySelector('.lists');
const clear = document.querySelector('.btn-clear');

let todos = JSON.parse(localStorage.getItem('todo-list'));
const showTodo = () => {
    let li = '';
    if (todos) {
        todos.forEach((todo) => {
            const flag = todo.completed ? 'checked' : '';
            li += ` <li class="list-info">
          <div class="check">
            <label for="">
              <input type="checkbox" ${flag} class="check" data-check="${todo.index}"/>
              <input type="text" class="todo-input style" data-desc="${todo.index}" value="${todo.description}" />
            </label>
          </div>
          <div class="icon">
          <i class="fa-solid fa-trash" id="${todo.index}"></i>
          </div>
        </li>`;
        });
    }
    UI.innerHTML = li;
};
showTodo();

taskInput.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = taskHandler.value.trim();
    taskHandler.value = '';
    if (!userInput) return;
    if (!todos) {
        todos = [];
    }
    const task = {
        description: userInput,
        completed: false,
        index: todos.length,
    };
    todos.push(task);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo();
});

const removeTask = (index) => {
    const newArr = todos.filter((element) => element.index !== index);
    todos.length = 0;
    let i = 0;
    newArr.forEach((element) => {
        element.index = i;
        i += 1;
    });

    todos.push(...newArr);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo();
};

UI.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-solid')) {
        const index = parseInt(e.target.getAttribute('id'), 10);
        removeTask(index);
    }
});

const update = (e) => {
    const clicked = e.target.closest('.todo-input');
    if (!clicked) return;
    clicked.addEventListener('keyup', () => {
        const task = JSON.parse(localStorage.getItem('todo-list')) || [];
        const targetData = parseInt(clicked.getAttribute('data-desc'), 10);
        const update = task.find((todo) => todo.index === targetData);
        update.description = clicked.value.trim();
        localStorage.setItem('todo-list', JSON.stringify(task));
    });
};

UI.addEventListener('click', update);

clear.addEventListener('click', () => {
    const setting = JSON.parse(localStorage.getItem('todo-list')) || [];
    const notCompleted = setting.filter((todo) => !todo.completed);
    todos.length = 0;
    let i = 0;
    notCompleted.forEach((element) => {
        element.index = i;
        i += 1;
    });

    todos.push(...notCompleted);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo();
});
const clearList = (e) => {
    const clicked = e.target.closest('.check');
    if (!clicked) return;
    const targetData = parseInt(clicked.getAttribute('data-check'), 10);
    const task = JSON.parse(localStorage.getItem('todo-list')) || [];
    const update = task.find((todo) => todo.index === targetData);
    update.completed = !update.completed;
    localStorage.setItem('todo-list', JSON.stringify(task));
  };

UI.addEventListener('click', clearList);
