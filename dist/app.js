"use strict";
var TodoInput = (function () {
    function TodoInput() {
        this.form_el = document.querySelector("form");
        this.title_el = document.getElementById("title");
        this.description_el = document.getElementById("description");
        this.configure();
    }
    TodoInput.prototype.configure = function () {
        this.form_el.addEventListener("submit", this.submitHandler.bind(this));
    };
    TodoInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var title = this.title_el.value;
        var description = this.description_el.value;
        var todo_container = document.getElementById("todo-list");
        var todo_el = document.createElement("div");
        todo_el.setAttribute("class", "todo");
        todo_container.appendChild(todo_el);
        var title_input_el = document.createElement("input");
        title_input_el.classList.add("form-control");
        title_input_el.type = "text";
        title_input_el.value = title;
        title_input_el.setAttribute("readonly", "readonly");
        var description_input_el = document.createElement("textarea");
        description_input_el.classList.add("form-control");
        description_input_el.setAttribute("id", "description");
        description_input_el.value = description;
        description_input_el.setAttribute("readonly", "readonly");
        var due_label = document.createElement("label");
        due_label.innerText = "Due: ";
        todo_el.appendChild(title_input_el);
        todo_el.appendChild(description_input_el);
        var task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");
        var task_edit_el = document.createElement("button");
        task_edit_el.setAttribute("class", "btn btn-dark");
        task_edit_el.innerText = "Edit";
        var task_delete_el = document.createElement("button");
        task_delete_el.setAttribute("class", "btn btn-dark");
        task_delete_el.innerText = "Delete";
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        todo_el.appendChild(task_actions_el);
        task_edit_el.addEventListener("click", function (event) {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                title_input_el.removeAttribute("readonly");
                description_input_el.removeAttribute("readonly");
                title_input_el.focus();
                description_input_el.focus();
            }
            else {
                task_edit_el.innerText = "Edit";
                title_input_el.setAttribute("readonly", "readonly");
                description_input_el.setAttribute("readonly", "readonly");
            }
        });
        task_delete_el.addEventListener("click", function (event) {
            todo_el.remove();
        });
        this.form_el.reset();
        todo_el.setAttribute("draggable", "true");
        var empties = document.querySelectorAll(".empty");
    };
    return TodoInput;
}());
var todoInput = new TodoInput();
