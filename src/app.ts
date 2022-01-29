class TodoInput {
  formElement: HTMLFormElement;
  titleElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;

  constructor() {
    this.formElement = document.querySelector('form')! as HTMLFormElement;
    this.titleElement = document.getElementById('title')! as HTMLInputElement;
    this.descriptionElement = document.getElementById(
      'description'
    ) as HTMLInputElement;

    this.configure();
  }
  private configure() {
    this.formElement.addEventListener('submit', this.submitHandler.bind(this));
  }

  private submitHandler(event: Event) {
    event.preventDefault();

    const title: string = this.titleElement.value;
    const description: string = this.descriptionElement.value;

    const todo_container = document.getElementById(
      'todo-list'
    ) as HTMLDivElement;
    const todoElement = document.createElement('div')! as HTMLDivElement;

    todoElement.setAttribute('class', 'todo');
    todo_container.appendChild(todoElement);

    const titleInputElement = document.createElement(
      'input'
    ) as HTMLInputElement;
    titleInputElement.classList.add('form-control');
    titleInputElement.type = 'text';
    titleInputElement.value = title;
    titleInputElement.setAttribute('readonly', 'readonly');

    const descriptionInputElement = document.createElement('textarea');
    descriptionInputElement.classList.add('form-control');
    descriptionInputElement.setAttribute('id', 'description');
    descriptionInputElement.value = description;
    descriptionInputElement.setAttribute('readonly', 'readonly');

    todoElement.appendChild(titleInputElement);
    todoElement.appendChild(descriptionInputElement);

    const taskActionElement = document.createElement('div')! as HTMLDivElement;
    taskActionElement.classList.add('actions');

    const taskEditElement = document.createElement(
      'button'
    ) as HTMLButtonElement;
    taskEditElement.setAttribute('class', 'btn btn-dark');
    taskEditElement.innerText = 'Edit';

    const taskDeleteElement = document.createElement(
      'button'
    ) as HTMLButtonElement;
    taskDeleteElement.setAttribute('class', 'btn btn-dark');
    taskDeleteElement.innerText = 'Delete';

    taskActionElement.appendChild(taskEditElement);
    taskActionElement.appendChild(taskDeleteElement);

    todoElement.appendChild(taskActionElement);

    // Editing items
    taskEditElement.addEventListener('click', (event: Event) => {
      if (taskEditElement.innerText.toLowerCase() == 'edit') {
        taskEditElement.innerText = 'Save';

        titleInputElement.removeAttribute('readonly');
        descriptionInputElement.removeAttribute('readonly');

        titleInputElement.focus();
        descriptionInputElement.focus();
      } else {
        taskEditElement.innerText = 'Edit';
        titleInputElement.setAttribute('readonly', 'readonly');
        descriptionInputElement.setAttribute('readonly', 'readonly');
      }
    });

    // Deleting items
    taskDeleteElement.addEventListener('click', function (event: Event) {
      todoElement.remove();
    });

    // Clear form
    this.formElement.reset();
  }
}

const todoInput = new TodoInput();
