// Variables 
var taskInput = document.getElementById('task');
var dateInput = document.getElementById('date');
var timeInput = document.getElementById('time');
var confirmBtn = document.getElementById('confirm');
var resetBtn = document.getElementById('reset')
var newTodosDiv = document.getElementById('todo');
var headerDiv = document.querySelector('.header')
var h2 = document.getElementById('fillFields')
var taskArr = [];
var temp;
var counterID = 0 // for id in object

// Constructor 
function Todo(id, todo, date, time) {
    this.id = id
    this.todo = todo
    this.date = date
    this.time = time
    this.status = false
}

Todo.prototype.toHTML = function () {
    return (`
                <span id=${this.id}>X</span>
                <p><b><em>Your Task Is :</em></b> ${this.todo}</p>
                <p><b><em>Due Date :</em></b></p> <p> ${this.date}<br>
                 ${this.time}</p> `
    )
}

confirmBtn.addEventListener('click', addTask)

function createTaskHtml(id, todo, date, time) {
    var temp = new Todo(id, todo, date, time)
    if (counterID === taskArr.length)
        taskArr.push(temp)
    return temp.toHTML()
}

function createNote() {
    // Create Task Div
    var div = document.createElement('div');
    div.classList = 'newTodos'
    // Creating Object && Html Content
    //When its first added
    if (counterID === taskArr.length) {
        div.innerHTML = createTaskHtml(counterID, taskInput.value, dateInput.value, timeInput.value)
    }
    else if (counterID <= taskArr.length) {
        div.innerHTML = createTaskHtml(counterID, taskArr[counterID].todo, taskArr[counterID].date, taskArr[counterID].time)
    }
    newTodosDiv.appendChild(div)
    // Add Remove Event To  Span
    var span = newTodosDiv.querySelectorAll('span')[counterID];
    span.addEventListener('click', removeTodo);
    resetForm()
}

function addTask() {
    // in case fields are not filled 
    if (taskInput.value === '' || dateInput.value === '') {
        h2.innerText = 'Fill Up All Mandatory Fields';
        if (taskInput.value === '') {
            taskInput.style.border = '2px solid red'
            taskInput.focus()
        } if (dateInput.value === '') {
            dateInput.style.border = '2px solid red'
            dateInput.focus()
        }
        setTimeout(function () {
            h2.innerText = ''
            taskInput.style.border = '1px solid black'
            dateInput.style.border = '1px solid black'
        }, 2000)
    }
    else {
        createNote()
        toLocalStorage()
        counterID++
    }
}

resetBtn.addEventListener('click', resetForm)

function resetForm() {
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

function toLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskArr))
}

function fromLocalStorage() {
    var tempStroage = localStorage.getItem('tasks');
    var data = JSON.parse(tempStroage)
    if (tempStroage) {
        taskArr = data
        for (i = 0; i < taskArr.length; i++) {
            createNote()
            counterID++
        }
    }
}

function removeTodo(e) {
    this.parentNode.parentNode.removeChild(this.parentNode);
    taskArr.splice(e.target.id, 1)
    // Re arrange tasks array
    for (var i = 0; i < taskArr.length; i++) {
        taskArr[i].id = i
        newTodosDiv.querySelectorAll('span')[i].id = i
    }
    localStorage.setItem('tasks', JSON.stringify(taskArr))
    counterID--
}

// Load localStorage Data and add notes 

window.addEventListener('load', function () {
    fromLocalStorage()
})


