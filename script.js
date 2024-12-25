let tasks = [];

const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById("progress").textContent = `${completedTasks}/${tasks.length}`;
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input field
        updateTasksList();
        updateProgress();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear task list

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = `todo-item ${task.completed ? "completed" : ""}`;
        listItem.innerHTML = `
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                    <div class="icons">
                        <img src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png" onclick="editTask(${index})" alt="Edit" />
                        <img src="https://img.icons8.com/ios-filled/50/000000/delete.png" onclick="deleteTask(${index})" alt="Delete" />
                    </div>
                `;

        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => {
            toggleTaskComplete(index);
            updateProgress();
        });

        taskList.appendChild(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateProgress();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateProgress();
};

const editTask = (index) => {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask.trim();
        updateTasksList();
    }
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
