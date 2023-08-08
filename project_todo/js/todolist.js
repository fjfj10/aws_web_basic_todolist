
// +(추가) 버튼을 눌렸을 때 todoObj형태로 객체 생성하여 Json으로 변경 후 서버 레파지토리에 저장 
const createTodoButtonOnClickHandle = () => {
    generrateTodoObj();
}

const generrateTodoObj = () => {
    const todoContent = document.querySelector(".create-todo-content").value;
    const todoDate = document.querySelector(".create-todo-date").value;

    const todoObj = {
        id: 0,
        todoContent: todoContent,
        todoDate: todoDate,
        completStatus: false
    };
    TodoListService.getInstance()
}


class TodoListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new todoListService();
        }
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() {
        this.loadTodoList();
    }

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        this.todoIndex = !!this.todoIndex[this.todoList.length - 1 ]?.id ? this.todoIndex[this.todoList.length - 1 ].id + 1 : 1;
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }

        this.todoList.push(todo);

        this.saveLocalStorage();

        this.updateTodoList();
        
        this.todoIndex++;
    }

    setCompletStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if (todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });

        this.saveLocalStorage();

        this.updateTodoList();
    }



    updateTodoList() {
        const  todoListContainer = document.querySelector(".todo-list-container");

        todoListContainer.innerHTML = this.todoList.map(todo => {
            return `
                <li class="todo">
                    <div>
                        <div class="todo-date">
                            ${todo.todoDate}
                        </div>
                        <div class="todo-content">
                            <div class="todo-check">
                                <input type="checkbox" id="complet-chk${todo.id}" class="complet-chkboxs"
                                ${todo.completStatus ? "checked" : ""} value=${todo.id}>
                                <label for="complet-chk${todo.id}">
                                </label>
                                <span class="todo-content">${todo.todoContent}</span>
                            </div>
                            <div class="todo-buttons">
                                <button class="todobtn edit-button">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="todobtn delete-button">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        }).join("");
    }
}

