const searchTodoButtonOnClickHandle = () => {
    TodoListService.getInstance().searchTodo();
}

const selectAllButtonOnClickHandle = (target) => {
    // console.log(target.innerHTML);  "전체"를 가지고 온다
    TodoListService.getInstance().selestTodo(target);
}

const selectCompletButtonOnClickHandle = (target) => {
    TodoListService.getInstance().selestTodo(target);
}

const selectIncompletButtonOnClickHandle = (target) => {
    TodoListService.getInstance().selestTodo(target);
}

const checkedOnChangeHandle = (target) => {
    TodoListService.getInstance().setCompletStatus(target.value, target.checked);
}

// 수정 버튼 클릭 시 모달창 띄우고 target.value로 id 찾아 modifyModal()로 넘겨주기
const modifyTodoButtonOnClickHandle = (target) => {
    openModal();
    modifyModal(TodoListService.getInstance().getTodoById(target.value));
}

// todo 삭제 후 저장 및 리스트 업로드
const deleteTodoButtonOnClickHandle = (target) => {
    TodoListService.getInstance().removeTodo(target.value);
}

// +(추가) 버튼을 눌렸을 때 todoObj형태로 객체 생성하여 Json으로 변경 후 서버 레파지토리에 저장 
const createTodoButtonOnClickHandle = () => {
    generrateTodoObj();
}

// input에 enter입력 시 todo생성 이벤트 추가
const createTodoOnKeyUpHandle = (event) => {
    if (event.keyCode === 13) {
        generrateTodoObj();
    }
}

const generrateTodoObj = () => {
    const todoContent = document.querySelector(".todo-list-create-todo .create-todo-content").value;
    const todoDate = document.querySelector(".todo-list-create-todo .create-todo-date").value;

    if (todoContent != "" && todoDate != "" ) {
        const todoObj = {
            id: 0,
            todoContent: todoContent,
            todoDate: todoDate,
            completStatus: false
        };
        TodoListService.getInstance().addTodo(todoObj);
    }else {
        alert("날짜와 내용을 모두 입력해주세요.")
    }
    
    
}


class TodoListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new TodoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() {
        this.loadTodoList();
    }

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        this.todoIndex = this.todoList.length > 0 ? Math.max(...this.todoList.map(todo => todo.id)) + 1 : 1;
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    searchTodo() {
        const searchTodoDate = document.querySelector(".search-todo-date").value;
        const searchTodoContent = document.querySelector(".search-todo-content").value;

        // console.log(!searchTodoDate);    값이 없으면 true, 값이 있으면 false 
        // console.log(!!searchTodoContent);    값이 없으면 false, 값이 있으면 true
        
        // 둘다 값을 가지면 
        if(!!searchTodoDate && !!searchTodoContent) {
            const filteredTodos = this.todoList.filter(todo => {
                return (
                    todo.todoDate === searchTodoDate && 
                    todo.todoContent.includes(searchTodoContent)
                );
            });
            this.updateTodoList(filteredTodos);

            //todoDate 값만 있는 경우
        }else if(!!searchTodoDate) {
            const filteredTodos = this.todoList.filter(todo => {
                return todo.todoDate === searchTodoDate;
            });
            this.updateTodoList(filteredTodos);

            //todoContent 값만 있는 경우
        }else if(!!searchTodoContent) {
            const filteredTodos = this.todoList.filter(todo => {
                return todo.todoContent.includes(searchTodoContent);
            });
            this.updateTodoList(filteredTodos);

            //값이 없는 경우
        }else {
            this.updateTodoList();
        }
    }

    selestTodo(target) {
        if (target.innerHTML === "전체") {
            this.updateTodoList();

        }else if(target.innerHTML === "완료") {
            const filteredTodos = this.todoList.filter(todo => {
                return todo.completStatus === true;
            });
            this.updateTodoList(filteredTodos);

        }else if(target.innerHTML === "미완료") {
            const filteredTodos = this.todoList.filter(todo => {
                return todo.completStatus === false;
            });
            this.updateTodoList(filteredTodos);
        }
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

    setTodo(todoObj) {
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            } 
        }
        this.saveLocalStorage();

        this.updateTodoList();
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        
        this.updateTodoList();
    }


    updateTodoList(filteredTodos = this.todoList) {
        const todoListContainer = document.querySelector(".todo-list-container");

        todoListContainer.innerHTML = filteredTodos.map(todo => {
            return `
                <li class="todo">
                    <div>
                        <div class="todo-date">
                            ${todo.todoDate}
                        </div>
                        <div class="todo-content">
                            <div class="todo-check">
                                <input type="checkbox" id="complet-chk${todo.id}" class="complet-chkboxs"
                                ${todo.completStatus ? "checked" : ""} value=${todo.id} onchange="checkedOnChangeHandle(this);">
                                <label for="complet-chk${todo.id}">
                                </label>
                                <span class="todo-content">${todo.todoContent}</span>
                            </div>
                            <div class="todo-buttons">
                                <button class="todobtn edit-button" value="${todo.id}" onclick="modifyTodoButtonOnClickHandle(this);">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="todobtn delete-button" value="${todo.id}" onclick="deleteTodoButtonOnClickHandle(this);">
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

