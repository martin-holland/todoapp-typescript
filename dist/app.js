"use strict";
var TodoInput = (function () {
    function TodoInput() {
        this.formElement = document.querySelector('form');
        this.titleElement = document.getElementById('title');
        this.descriptionElement = document.getElementById('description');
        this.configure();
    }
    TodoInput.prototype.configure = function () {
        this.formElement.addEventListener('submit', this.submitHandler.bind(this));
    };
    TodoInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var title = this.titleElement.value;
        var description = this.descriptionElement.value;
        var todo_container = document.getElementById('todo-list');
        var todoElement = document.createElement('div');
        todoElement.setAttribute('class', 'todo');
        todo_container.appendChild(todoElement);
        var titleInputElement = document.createElement('input');
        titleInputElement.classList.add('form-control');
        titleInputElement.type = 'text';
        titleInputElement.value = title;
        titleInputElement.setAttribute('readonly', 'readonly');
        var descriptionInputElement = document.createElement('textarea');
        descriptionInputElement.classList.add('form-control');
        descriptionInputElement.setAttribute('id', 'description');
        descriptionInputElement.value = description;
        descriptionInputElement.setAttribute('readonly', 'readonly');
        todoElement.appendChild(titleInputElement);
        todoElement.appendChild(descriptionInputElement);
        var taskActionElement = document.createElement('div');
        taskActionElement.classList.add('actions');
        var taskEditElement = document.createElement('button');
        taskEditElement.setAttribute('class', 'btn btn-dark');
        taskEditElement.innerText = 'Edit';
        var taskDeleteElement = document.createElement('button');
        taskDeleteElement.setAttribute('class', 'btn btn-dark');
        taskDeleteElement.innerText = 'Delete';
        taskActionElement.appendChild(taskEditElement);
        taskActionElement.appendChild(taskDeleteElement);
        todoElement.appendChild(taskActionElement);
        taskEditElement.addEventListener('click', function (event) {
            if (taskEditElement.innerText.toLowerCase() == 'edit') {
                taskEditElement.innerText = 'Save';
                titleInputElement.removeAttribute('readonly');
                descriptionInputElement.removeAttribute('readonly');
                titleInputElement.focus();
                descriptionInputElement.focus();
            }
            else {
                taskEditElement.innerText = 'Edit';
                titleInputElement.setAttribute('readonly', 'readonly');
                descriptionInputElement.setAttribute('readonly', 'readonly');
            }
        });
        taskDeleteElement.addEventListener('click', function (event) {
            todoElement.remove();
        });
        this.formElement.reset();
    };
    return TodoInput;
}());
var todoInput = new TodoInput();
