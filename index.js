var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//getting the dom elemnts......and its val
var inputField = document.querySelector("#todoInput");
var addButton = document.querySelector("#add");
//todoList
var todoList = document.querySelector("#todoList");
var todos = [
    { id: Date.now(), todo: "learn Typescript", completed: false },
];
todoList.innerHTML = todos
    .map(function (todo) { return " \n        <li class=\"box is-flex is-justify-content-space-between\">\n          <span>".concat(todo.todo, "<button class=\"ml-2 delete-btn\" data-id=\"").concat(todo.id, "\">\u274C</button> <button class=\"ml-2 edit-btn\" data-id=\"").concat(todo.id, "\">\u270F\uFE0F</button> </span>\n        </li>\n      "); })
    .join("");
var addTodo = function () {
    if (inputField === null || inputField === void 0 ? void 0 : inputField.value) {
        todos.push({
            id: Date.now(),
            todo: inputField.value,
            completed: false,
        });
        inputField.value = "";
    }
};
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", function () {
    addTodo();
    todoList.innerHTML = todos
        .map(function (todo) { return "\n        <li class=\"box is-flex is-justify-content-space-between\">\n        <span>".concat(todo.todo, "<button class=\"ml-2 delete-btn\" data-id=\"").concat(todo.id, "\">\u274C</button> <button class=\"ml-2 edit-btn\" data-id=\"").concat(todo.id, "\">\u270F\uFE0F</button> </span>\n        </li>\n      "); })
        .join("");
});
//const DeleteBtn = document.querySelector<HTMLButtonElement>("#DeleteBtn"); cant use this ....
//to delete values from todo
todoList === null || todoList === void 0 ? void 0 : todoList.addEventListener("click", function (event) {
    var targetButton = event.target;
    if (targetButton.classList.contains("delete-btn")) {
        //Checks if the clicked element has the class delete-btn
        var id = Number(targetButton.dataset.id);
        deleteTodo(id);
        todoList.innerHTML = todos
            .map(function (todo) { return "\n          <li class=\"box is-flex is-justify-content-space-between\">\n          <span>".concat(todo.todo, "<button class=\"ml-2 delete-btn\" data-id=\"").concat(todo.id, "\">\u274C</button> <button class=\"ml-2 edit-btn\" data-id=\"").concat(todo.id, "\">\u270F\uFE0F</button>  </span>\n          </li>\n        "); })
            .join("");
    }
});
//const editTodo = ... (already defined)
///update the todo elemts by click on the edit icon on <li> gets the id instead of rendering todo values replace todo text with input and save buttton
var editTodo = function (target, id) {
    if (target.classList.contains("edit-btn")) {
        //parent elemnt of clicked btn
        var parentElement = target.parentElement; // ! it tells parent elemt exist  // basiciallyy to avoid error
        var todoObj = todos.find(function (todo) { return todo.id === id; });
        if (todoObj) {
            //if the id matches replace text with input and save button
            parentElement.innerHTML = "\n  <input type=\"text\" class=\"edit-input\" value=\"".concat(todoObj.todo, "\" data-id=\"").concat(id, "\" />\n  <button class=\"save-btn\" data-id=\"").concat(id, "\">\uD83D\uDCBE</button>\n");
        }
    }
};
//handle edit and save
todoList === null || todoList === void 0 ? void 0 : todoList.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("edit-btn")) {
        var id = Number(target.dataset.id);
        editTodo(target, id);
    }
    if (target.classList.contains("save-btn")) {
        var id_1 = Number(target.dataset.id);
        var input_1 = todoList.querySelector(".edit-input[data-id=\"".concat(id_1, "\"]"));
        if (input_1 === null || input_1 === void 0 ? void 0 : input_1.value) {
            todos = todos.map(function (todo) {
                return todo.id === id_1 ? __assign(__assign({}, todo), { todo: input_1.value }) : todo;
            });
            todoList.innerHTML = todos
                .map(function (todo) { return "\n          <li class=\"box is-flex is-justify-content-space-between\">\n            <span>".concat(todo.todo, "<button class=\"ml-2 delete-btn\" data-id=\"").concat(todo.id, "\">\u274C</button> <button class=\"ml-2 edit-btn\" data-id=\"").concat(todo.id, "\">\u270F\uFE0F</button> </span>\n          </li>\n        "); })
                .join("");
        }
    }
});
var deleteTodo = function (id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
};
