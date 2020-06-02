// Variables 
var taskInput = document.getElementById('task');
var dateInput = document.getElementById('date');
var timeInput = document.getElementById('time');
var confirmBtn = document.getElementById('confirm');
var newTodosDiv = document.getElementById('todo')
var taskArr = [];
var counterID = 0 // for id in object
// Constructor 
function Todo(id, todo, date, time) {
    this.id = id
    this.todo = todo
    this.date = date
    this.time = time
    this.status = false
}

confirmBtn.addEventListener('click', addTask)

function addTask() {
    if (taskInput.value === '' || dateInput.value === '' || timeInput === '') {
        alert('Fill Up All Fields')
    }
    else {
        // Create Task Div
        var div = document.createElement('div');
        div.classList = 'newTodos'
        // Remove Button
        var span = document.createElement('span');
        span.textContent = 'X'
        span.setAttribute('id', counterID)
        span.addEventListener('click', removeTodo)
        div.appendChild(span)
        // Getting task value and creating element
        var pTask = document.createElement('p')
        pTask.textContent = `Your Task is : ${taskInput.value}`
        div.appendChild(pTask)
        // Getting Date value and creating element
        var pDate = document.createElement('p')
        pDate.textContent = `Due Date : ${dateInput.value}`
        div.appendChild(pDate)
        var pTime = document.createElement('p')
        pTime.textContent = `Due Time : ${timeInput.value}`
        div.appendChild(pTime)
        newTodosDiv.appendChild(div)
        // Add to Object Array
        var temp = new Todo(counterID, taskInput.value, dateInput.value, timeInput.value)
        taskArr.push(temp)
        toLocalStorage()
        counterID++
    }
}

function toLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskArr))
}

function fromLocalStorage() {
    var temp = localStorage.getItem('tasks');
    var data = JSON.parse(temp)
    if (temp) {
        taskArr = data
    }
}

function removeTodo(e) {
    this.parentNode.parentNode.removeChild(this.parentNode);
    taskArr.splice(e.target.id, 1)
    for (var i = 0; i < taskArr.length; i++) {
        taskArr[i].id = i
    }
    localStorage.setItem('tasks', JSON.stringify(taskArr))
    counterID -= 1
}

// Load localStorage Data 

window.addEventListener('load', function () {
    fromLocalStorage()
    for (var i = 0; i < taskArr.length; i++) {
        var div = document.createElement('div');
        div.classList = 'newTodos'
        // Remove Button
        var span = document.createElement('span');
        span.textContent = 'X'
        span.setAttribute('id', counterID)
        span.addEventListener('click', removeTodo)
        div.appendChild(span)
        // Task
        var pTask = document.createElement('p')
        pTask.textContent = `Your Task is : ${taskArr[i].todo}`
        div.appendChild(pTask)
        // Date
        var pDate = document.createElement('p')
        pDate.textContent = `Due Date : ${taskArr[i].data}`
        div.appendChild(pDate)
        // Time 
        var pTime = document.createElement('p')
        pTime.textContent = `Due Time : ${taskArr[i].time}`
        div.appendChild(pTime)
        newTodosDiv.appendChild(div)
        counterID++
    }
})

