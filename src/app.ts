class TodoInput {
  form_el: HTMLFormElement;
  title_el: HTMLInputElement;
  description_el: HTMLInputElement;

  constructor() {
    this.form_el = document.querySelector("form") as HTMLFormElement;
    this.title_el = document.getElementById("title") as HTMLInputElement;
    this.description_el = document.getElementById(
      "description"
    ) as HTMLInputElement;

    this.configure();
  }
  private configure() {
    this.form_el.addEventListener("submit", this.submitHandler.bind(this));
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    const title: string = this.title_el.value;
    const description: string = this.description_el.value;

    const todo_container = document.getElementById(
      "todo-list"
    ) as HTMLDivElement;
    const todo_el = document.createElement("div") as HTMLDivElement;

    todo_el.setAttribute("class", "todo");
    todo_container.appendChild(todo_el);

    const title_input_el = document.createElement("input") as HTMLInputElement;
    title_input_el.classList.add("form-control");
    title_input_el.type = "text";
    title_input_el.value = title;
    title_input_el.setAttribute("readonly", "readonly");

    const description_input_el = document.createElement("textarea");
    description_input_el.classList.add("form-control");
    description_input_el.setAttribute("id", "description");
    description_input_el.value = description;
    description_input_el.setAttribute("readonly", "readonly");

    const due_label = document.createElement("label") as HTMLLabelElement;
    due_label.innerText = "Due: ";

    todo_el.appendChild(title_input_el);
    todo_el.appendChild(description_input_el);

    const task_actions_el = document.createElement("div") as HTMLDivElement;
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button") as HTMLButtonElement;
    task_edit_el.setAttribute("class", "btn btn-dark");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement(
      "button"
    ) as HTMLButtonElement;
    task_delete_el.setAttribute("class", "btn btn-dark");
    task_delete_el.innerText = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    todo_el.appendChild(task_actions_el);

    // Editing items
    task_edit_el.addEventListener("click", (event: Event) => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";

        title_input_el.removeAttribute("readonly");
        description_input_el.removeAttribute("readonly");

        title_input_el.focus();
        description_input_el.focus();
      } else {
        task_edit_el.innerText = "Edit";
        title_input_el.setAttribute("readonly", "readonly");
        description_input_el.setAttribute("readonly", "readonly");
      }
    });

    // deleting items
    task_delete_el.addEventListener("click", function (event: Event) {
      todo_el.remove();
    });
    // clear form
    this.form_el.reset();

    todo_el.setAttribute("draggable", "true");
    const empties = document.querySelectorAll(".empty");
  }
}

const todoInput = new TodoInput();
