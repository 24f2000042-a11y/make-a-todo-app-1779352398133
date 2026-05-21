document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage if available
    const loadTasks = () => {
        const tasks = JSON.parse(.getItem('tasks') || '[]');
        tasks.forEach(taskText => {
            addTaskToDOM(taskText);
        });
    };

    // Add task to DOM
    const addTaskToDOM = (taskText) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${taskText}</span><button class='delete-btn'>Delete</button>`;
        taskList.appendChild(li);

        // Add event listener to delete button
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            update();
        });

        // Add event listener to mark as complete (simple toggle class)
        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) return;
            li.classList.toggle('completed');
            update();
        });
    };

    // Add new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            taskInput.value = '';
            update();
        }
    };

    // Update local storage
    const update = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        .setItem('tasks', JSON.stringify(tasks));
    };

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial load
    loadTasks();
});
