  //Não roda o LocalHost!! Ajuda ae
  //F12 dando erro na hora de rodar no navegador

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
  });
  
  function fetchTasks() {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(tasks => {
        displayTasks(tasks);
      })
      .catch(error => console.error('Erro ao obter tarefas:', error));
  }
  
  function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
  
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.title;
      li.addEventListener('click', () => deleteTask(task.id));
      taskList.appendChild(li);
    });
  }
  
  function addTask() {
    const taskInput = document.getElementById('task-input');
    const title = taskInput.value.trim();
  
    if (title !== '') {
      fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })
        .then(response => response.json())
        .then(() => {
          taskInput.value = '';
          fetchTasks();
        })
        .catch(error => console.error('Erro ao adicionar tarefa:', error));
    }
  }
  
  function deleteTask(id) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchTasks())
      .catch(error => console.error('Erro ao excluir tarefa:', error));
  }
  