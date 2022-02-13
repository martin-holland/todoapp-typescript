"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var STATUS;
(function (STATUS) {
    STATUS[STATUS["Pending"] = 0] = "Pending";
    STATUS[STATUS["Finished"] = 1] = "Finished";
})(STATUS || (STATUS = {}));
var something = "";
function validate(todo) {
    var isValid = true;
    if (todo.min && todo.text.length < todo.min) {
        isValid = false;
    }
    return isValid;
}
var TodoStructure = (function () {
    function TodoStructure(id, input, status) {
        this.id = id;
        this.input = input;
        this.status = status;
    }
    return TodoStructure;
}());
var AppState = (function () {
    function AppState() {
        this.todos = [];
    }
    AppState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AppState();
        return this.instance;
    };
    AppState.prototype.getTodoList = function () {
        new TodoList(this.todos, 'Pending');
        new TodoList(this.todos, 'Finished');
    };
    AppState.prototype.addTodo = function (id, input, status) {
        var todoItem = new TodoStructure(id, input, status);
        this.todos.push(todoItem);
        this.getTodoList();
    };
    Object.defineProperty(AppState.prototype, "Todos", {
        get: function () {
            return this.todos;
        },
        set: function (todoItems) {
            this.todos = __spreadArray([], todoItems, true);
            this.getTodoList();
        },
        enumerable: false,
        configurable: true
    });
    return AppState;
}());
var appState = AppState.getInstance();
var TodoItem = (function () {
    function TodoItem(id, input, todoItems) {
        this.id = id;
        this.input = input;
        this.todoItems = todoItems;
        this.tempElement = document.querySelector('template');
        this.ulElement = document.querySelector('ul');
        var importedHtml = document.importNode(this.tempElement.content, true);
        this.liElement = importedHtml.firstElementChild;
        this.attach();
        this.display();
        this.deleteTodo();
        this.editTodo();
    }
    TodoItem.prototype.attach = function () {
        console.log(this.todoItems, this.liElement, this.ulElement);
        this.ulElement.insertAdjacentElement('afterbegin', this.liElement);
    };
    TodoItem.prototype.display = function () {
        this.ulElement.querySelector('h1').textContent = this.input;
        this.ulElement.querySelector('.del').id = this.id;
        this.ulElement.querySelector('.edit').id = this.id;
    };
    TodoItem.prototype.deleteItem = function (id, todoItems) {
        var removedTodo = todoItems.filter(function (todo) {
            todo.id !== id;
            localStorage.removeItem(todo.id);
        });
        appState.Todos = removedTodo;
    };
    TodoItem.prototype.deleteHandler = function () {
        if (document.querySelector('input').value) {
            alert('Todo already selected');
            return;
        }
        var id = this.id.toString();
        var todoItems = __spreadArray([], appState.Todos, true);
        this.deleteItem(id, todoItems);
    };
    TodoItem.prototype.editHandler = function () {
        if (document.querySelector('input').value) {
            alert('Todo already selected');
            return;
        }
        var id = this.id.toString();
        var todoItems = __spreadArray([], appState.Todos, true);
        var getText = todoItems.find(function (todo) { return todo.id === id; });
        document.querySelector('input').value = getText.input;
        this.deleteItem(id, todoItems);
    };
    TodoItem.prototype.deleteTodo = function () {
        this.liElement
            .querySelector('.del')
            .addEventListener('click', this.deleteHandler.bind(this));
    };
    TodoItem.prototype.editTodo = function () {
        this.liElement
            .querySelector('.edit')
            .addEventListener('click', this.editHandler.bind(this));
    };
    return TodoItem;
}());
var TodoList = (function () {
    function TodoList(todoItems, type) {
        this.todoItems = todoItems;
        this.type = type;
        this.display();
        console.log(this.type);
    }
    TodoList.prototype.display = function () {
        document.querySelector('ul').innerText = '';
        for (var _i = 0, _a = this.todoItems; _i < _a.length; _i++) {
            var todo_1 = _a[_i];
            new TodoItem(todo_1.id, todo_1.input, this.todoItems);
        }
    };
    return TodoList;
}());
var TodoInput = (function () {
    function TodoInput() {
        this.container = document.querySelector('.container');
        this.heading = document.createElement('h2');
        this.heading.textContent = "To Do App";
        this.container.prepend(this.heading);
        this.form = document.querySelector('form');
        this.deleteAll = document.createElement('button');
        this.deleteAll.type = "button";
        this.deleteAll.textContent = "Delete All";
        this.deleteAll.className = "deleteAll";
        this.listArea = document.getElementById('listarea');
        this.form.prepend(this.deleteAll);
        this.deleteAll.addEventListener('click', this.deleteAllHandler.bind(this));
        this.todoInput = document.querySelector('input');
        this.submitButton = document.querySelector('.addTodo');
        this.submit();
    }
    TodoInput.prototype.deleteAllHandler = function (e) {
        e.preventDefault();
        var deleteAllConfirm = window.confirm('Are you sure you want to delete all To do Entries?');
        if (deleteAllConfirm == true) {
            this.listArea.innerHTML = "";
        }
    };
    TodoInput.prototype.validation = function (value) {
        var checkInput = validate({
            text: value,
            min: 3,
        });
        if (!checkInput) {
            alert('To do task needs to be longer than 3 characters');
            return;
        }
        return value;
    };
    TodoInput.prototype.clearFormInput = function () {
        this.todoInput.value = '';
    };
    TodoInput.prototype.submitHandler = function (e) {
        e.preventDefault();
        console.log('event');
        var getTodoValue = this.todoInput.value;
        var ValidatedText = this.validation(getTodoValue);
        if (ValidatedText) {
            var id = Math.random().toString();
            appState.addTodo(id, ValidatedText, STATUS.Pending);
            console.log('Test for localStorage: ' + id, ValidatedText);
            localStorage.setItem(id, ValidatedText);
            this.clearFormInput();
        }
        else {
            this.clearFormInput();
        }
    };
    TodoInput.prototype.submit = function () {
        console.log(this.submitButton, this.todoInput);
        this.submitButton.addEventListener('click', this.submitHandler.bind(this));
    };
    return TodoInput;
}());
var todo = new TodoInput();
