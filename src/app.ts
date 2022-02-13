
enum STATUS {
  Pending,
  Finished,
}

const something = ""

type dType = string;

//Validation
interface TodoInputValidation {
  text: dType;
  min?: number;
}

//validattion for todo input
function validate(todo: TodoInputValidation) {
  let isValid = true;
  if (todo.min && todo.text.length < todo.min) {
    isValid = false;
  }
  return isValid;
}

//TodoInput structure
class TodoStructure {
  constructor(public id: dType, public input: dType, public status: STATUS) {}
}


//state management- global storage of todo items
class AppState {
  protected todos: TodoStructure[];
  private static instance: AppState;

  protected constructor() {
    this.todos = [];
    // for (let i  = 0; i < localStorage.length; i++) {
    //     let id = localStorage.getItem(localStorage.key(i))
    //     this.todos.push(id)
    // }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AppState();
    return this.instance;
  }

  //  todoItems rerender when todoList changes
  protected getTodoList() {
    new TodoList(this.todos, 'Pending');
    new TodoList(this.todos, 'Finished');
  }

  //addTodo
  addTodo(id: string, input: string, status: STATUS) {
    const todoItem = new TodoStructure(id, input, status);
    this.todos.push(todoItem);
    //console.log(this.todos);
    this.getTodoList();
  }

  //set method - set todoItems after it is edited/deleted
  set Todos(todoItems: TodoStructure[]) {
    this.todos = [...todoItems];
    this.getTodoList();
  }

  //get method - to access todoList  
  get Todos() {
    return this.todos;
  }
}

const appState = AppState.getInstance();

//creating a list which appends to ul
class TodoItem {
  tempElement: HTMLTemplateElement;
  ulElement: HTMLUListElement;
  liElement: HTMLLIElement;
  constructor(
    private id: string,
    private input: string,
    private todoItems: TodoStructure[] // private status:STATUS
  ) {
    this.tempElement = document.querySelector('template')!;
    this.ulElement = document.querySelector('ul')! as HTMLUListElement;

    const importedHtml = document.importNode(this.tempElement.content, true);
    this.liElement = importedHtml.firstElementChild as HTMLLIElement;
    this.attach();
    this.display();
    this.deleteTodo();
    this.editTodo();
  }

  private attach() {
    console.log(this.todoItems, this.liElement, this.ulElement);
    this.ulElement.insertAdjacentElement('afterbegin', this.liElement)!;
  }

  private display() {
    this.ulElement.querySelector('h1')!.textContent = this.input;
    this.ulElement.querySelector('.del')!.id = this.id;
    this.ulElement.querySelector('.edit')!.id = this.id;
  }
  //delete by its id and updating todolist using set method
  private deleteItem(id: string, todoItems: TodoStructure[]) {
    const removedTodo = todoItems.filter((todo) => {
      todo.id !== id
      localStorage.removeItem(todo.id)
    });
    appState.Todos = removedTodo;
  }

  private deleteHandler() {
    if (document.querySelector('input')!.value) {
      alert('Todo already selected');
      return;
    }
    const id = this.id.toString();
    const todoItems = [...appState.Todos];
    this.deleteItem(id, todoItems);
  }

  //list item selected is transfered to text input field
  private editHandler() {
    if (document.querySelector('input')!.value) {
      alert('Todo already selected');
      return;
    }
    const id = this.id.toString();
    const todoItems = [...appState.Todos];
    const getText = todoItems.find((todo) => todo.id === id)!;
    document.querySelector('input')!.value = getText.input;
    this.deleteItem(id, todoItems);
  }

  private deleteTodo() {
    this.liElement
      .querySelector('.del')!
      .addEventListener('click', this.deleteHandler.bind(this));
  }

  private editTodo() {
    this.liElement
      .querySelector('.edit')!
      .addEventListener('click', this.editHandler.bind(this));
  }
}

//looping over todoList and creating an object for individual todo item
class TodoList {
  //private assignedTodo:TodoStructure=[];
  constructor(
    private todoItems: TodoStructure[],
    private type: 'Pending' | 'Finished',
    //private assignedTodo: TodoStructure[] = []
  ) {
    this.display();
    console.log(this.type);
  }

  private display() {
    //console.log(this.todoItems);
    
      document.querySelector('ul')!.innerText = '';
    
    //console.log(this.assignedTodo);
    //this.config();
    for (let todo of this.todoItems) {
      //console.log(todo);
      new TodoItem(todo.id, todo.input, this.todoItems);
    }
  }

  
}

// get  todoInput,validate and add
class TodoInput {
  todoInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
  container: HTMLElement;
  heading: HTMLElement;
  form: HTMLFormElement;
  deleteAll: HTMLButtonElement;
  listArea: HTMLUListElement;
  constructor() {
    // initialisation for document for display and styling

    this.container = document.querySelector('.container')! as HTMLElement;
    this.heading = document.createElement('h2')! as HTMLElement;
    this.heading.textContent = "To Do App"
    this.container.prepend(this.heading)
    this.form = document.querySelector('form')! as HTMLFormElement
    this.deleteAll = document.createElement('button')! as HTMLButtonElement;
    this.deleteAll.type = "button";
    this.deleteAll.textContent = "Delete All"
    this.deleteAll.className = "deleteAll"
    this.listArea = document.getElementById('listarea')! as HTMLUListElement
    this.form.prepend(this.deleteAll)

    this.deleteAll.addEventListener('click', this.deleteAllHandler.bind(this))


    // intialisation for user interaction
    this.todoInput = document.querySelector('input')! as HTMLInputElement;
    this.submitButton = document.querySelector(
      '.addTodo'
    )! as HTMLButtonElement;
    this.submit();
  }


  private deleteAllHandler(e: Event) {
    e.preventDefault()
    let deleteAllConfirm = window.confirm('Are you sure you want to delete all To do Entries?')
    if (deleteAllConfirm == true) {
    this.listArea.innerHTML = "";
    }
  }

  private validation(value: string): string | undefined {
    const checkInput = validate({
      text: value,
      min: 3,
    });
    if (!checkInput) {
      alert('To do task needs to be longer than 3 characters');
      return;
    }
    return value;
  }

  private clearFormInput() {
    this.todoInput.value = '';
  }
  //adding todoInput by using addTodo method(in AppState)
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log('event');
    const getTodoValue = this.todoInput.value;
    const ValidatedText = this.validation(getTodoValue);
    if (ValidatedText) {
      const id = Math.random().toString();
      appState.addTodo(id, ValidatedText, STATUS.Pending);
      console.log('Test for localStorage: ' + id, ValidatedText)
      localStorage.setItem(id, ValidatedText)
      this.clearFormInput();
    } else {
      this.clearFormInput();
    }
  }
  private submit() {
    console.log(this.submitButton, this.todoInput);
    this.submitButton.addEventListener('click', this.submitHandler.bind(this));
  }
}

const todo = new TodoInput();
//const todolist=new TodoList();