//getting the dom elemnts......and its val
const inputField = document.querySelector<HTMLInputElement>("#todoInput");
const addButton = document.querySelector<HTMLButtonElement>("#add");
//todoList
const todoList = document.querySelector<HTMLUListElement>("#todoList");

type TodoType = {
  id: number;
  todo: string;
  completed: boolean;
};
let todos: TodoType[] = [
  { id: Date.now(), todo: "learn Typescript", completed: false },
];

todoList!.innerHTML = todos
  .map(
    (todo) => ` 
        <li class="box is-flex is-justify-content-space-between">
          <span>${todo.todo}<button class="ml-2 delete-btn" data-id="${todo.id}">❌</button> <button class="ml-2 edit-btn" data-id="${todo.id}">✏️</button> </span>
        </li>
      `,
  )
  .join("");

const addTodo = (): void => {
  if (inputField?.value) {
    todos.push({
      id: Date.now(),
      todo: inputField.value,
      completed: false,
    });
    inputField.value = "";
  }
};

addButton?.addEventListener("click", () => {
  addTodo();
  todoList!.innerHTML = todos
    .map(
      (todo) => `
        <li class="box is-flex is-justify-content-space-between">
        <span>${todo.todo}<button class="ml-2 delete-btn" data-id="${todo.id}">❌</button> <button class="ml-2 edit-btn" data-id="${todo.id}">✏️</button> </span>
        </li>
      `,
    )
    .join("");
});

//const DeleteBtn = document.querySelector<HTMLButtonElement>("#DeleteBtn"); cant use this ....

//to delete values from todo
todoList?.addEventListener("click", (event) => {
  const targetButton = event.target as HTMLButtonElement;
  if (targetButton.classList.contains("delete-btn")) {
    //Checks if the clicked element has the class delete-btn
    const id = Number(targetButton.dataset.id);
    deleteTodo(id);
    todoList!.innerHTML = todos
      .map(
        (todo) => `
          <li class="box is-flex is-justify-content-space-between">
          <span>${todo.todo}<button class="ml-2 delete-btn" data-id="${todo.id}">❌</button> <button class="ml-2 edit-btn" data-id="${todo.id}">✏️</button>  </span>
          </li>
        `,
      )
      .join("");
  }
});

//const editTodo = ... (already defined)
///update the todo elemts by click on the edit icon on <li> gets the id instead of rendering todo values replace todo text with input and save buttton
const editTodo = (target: HTMLElement, id: number): void => {
  if (target.classList.contains("edit-btn")) {
    //parent elemnt of clicked btn
    const parentElement = target.parentElement!; // ! it tells parent elemt exist  // basiciallyy to avoid error
    const todoObj = todos.find((todo) => todo.id === id);
    if (todoObj!) {
      //if the id matches replace text with input and save button
      parentElement.innerHTML = `
  <input type="text" class="edit-input" value="${todoObj.todo}" data-id="${id}" />
  <button class="save-btn" data-id="${id}">💾</button>
`;
    }
  }
};

//handle edit and save
todoList?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("edit-btn")) {
    const id = Number(target.dataset.id);
    editTodo(target, id);
  }

  if (target.classList.contains("save-btn")) {
    const id = Number(target.dataset.id);
    const input = todoList!.querySelector<HTMLInputElement>(`.edit-input[data-id="${id}"]`);
    if (input?.value) {
      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, todo: input.value } : todo
      );
      todoList!.innerHTML = todos
        .map(
          (todo) => `
          <li class="box is-flex is-justify-content-space-between">
            <span>${todo.todo}<button class="ml-2 delete-btn" data-id="${todo.id}">❌</button> <button class="ml-2 edit-btn" data-id="${todo.id}">✏️</button> </span>
          </li>
        `,
        )
        .join("");
    }
  }
});

const deleteTodo = (id: number): void => {
  todos = todos.filter((todo) => todo.id !== id);
};
