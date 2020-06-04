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

Todo.prototype.addHTML = function () {
    return (`
                <span id=${this.id}>X</span> 
                <p>Your Task Is : ${this.todo}</p>
                <p>Due Date : ${this.date}</p>
                <p>Due Time${this.time}</p> `


    )
}

confirmBtn.addEventListener('click', addTask)

function addTask() {
    if (taskInput.value === '' || dateInput.value === '' || timeInput.value === '') {
        alert('Fill Up All Fields')
    }
    else {
        // Create Task Div
        var div = document.createElement('div');
        div.classList = 'newTodos'
        // Creating Object
        var temp = new Todo(counterID, taskInput.value, dateInput.value, timeInput.value)
        // Calling prototype 
        div.innerHTML = temp.addHTML()
        newTodosDiv.appendChild(div)
        taskArr.push(temp)
        toLocalStorage()
        counterID++
        // Add Remove Event To All Spans 
        var span = document.querySelectorAll('span')
        for (var i = 0; i < span.length; i++) {
            span[i].addEventListener('click', removeTodo)
        }
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
        console.log(taskArr)
    }
}

function removeTodo(e) {
    this.parentNode.parentNode.removeChild(this.parentNode);
    taskArr.splice(e.target.id, 1)

    // Re arrange tasks array
    for (var i = 0; i < taskArr.length; i++) {
        taskArr[i].id = i
        document.querySelectorAll('span')[i].id = i
    }
    localStorage.setItem('tasks', JSON.stringify(taskArr))
    counterID--
}

// Load localStorage Data 

window.addEventListener('load', function () {
    fromLocalStorage()
    for (var i = 0; i < taskArr.length; i++) {
        var div = document.createElement('div');
        div.classList = 'newTodos'
        var temp = new Todo(counterID, taskArr[i].todo, taskArr[i].date, taskArr[i].time)
        div.innerHTML = temp.addHTML()
        newTodosDiv.appendChild(div)
        var span = document.querySelectorAll('span')
        for (var i = 0; i < span.length; i++) {
            span[i].addEventListener('click', removeTodo)
        }
        counterID++
    }
})

