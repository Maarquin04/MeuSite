window.onload = function() {
    loadTasks();
}

function addTask() {
    const input = document.getElementById('inputText');
    const task = input.value.trim();

    if (task !== "") {
        const taskList = getTasks();
        taskList.push(task);
        saveTasks(taskList);
        input.value = '';
        renderTasks();
    } else {
        alert('Por favor, insira uma tarefa.');
    }
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = task;
        li.appendChild(createDeleteButton(index));
        taskList.appendChild(li);
    });
}

function createDeleteButton(index) {
    const button = document.createElement('button');
    button.className = 'btn btn-danger btn-sm';
    button.textContent = 'Excluir';
    button.onclick = function() {
        deleteTask(index);
    };
    return button;
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}