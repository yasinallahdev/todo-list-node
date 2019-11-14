const todoBoxItems = document.querySelectorAll(".todoItem");
const clearAllTasksButton = document.querySelector("#clearAllTasksButton");
const clearCompletedTasksButton = document.querySelector("#clearCompletedTasksButton");

todoBoxItems.forEach(el => {
    el.addEventListener('click', () => {
        const objectID = event.target.parentNode.querySelector('.idData');
        fetch('toggleComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              '_id': objectID.textContent,
              'updatedComplete': !event.target.classList.contains("completed")
            })
          })
          .then(response => {
            if (response.ok) return response.json()
          })
          .then(data => {
            console.log(data)
            window.location.reload(true)
          });
    });
});

function clearTasksEvent(completedOnly) {
    fetch('clearTasks', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'completedOnly': completedOnly})
    })
    .then(() => {
        window.location.reload(true)
    }); 
}

clearCompletedTasksButton.addEventListener('click', () => {
    clearTasksEvent(true);
});

clearAllTasksButton.addEventListener('click', () => {
    clearTasksEvent(false);
});
