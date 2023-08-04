/*
 *추가 버튼을 눌렀을 때
 **/
const addTodoButtonOnClickHandle = () => {
    //스프레드(spread)문법 : ...
    // const testObj = {
    //     name: "김준일",
    //     age: 10
    // }

    // console.log(testObj);

    // const testObj2 = {
    //     //...testObj = 깊은 복사 = 객체를 생성한 것과 같음
    //     ...testObj,
    //     adrress: "부산",
    //     name: "김준이"  //testObj의 name값을 바꿀 수 있음
    // }

    // console.log(testObj2);

    // const testArray = [1,2,3,4,5];
    // console.log(testArray);
    // const testArray2 = [...testArray,6,7,8];
    // console.log(testArray2);

    generrateTodoObj();
}

// onkeyup : 키를 눌렀다가 땠을 때 이벤트
const addTodoOnKeyUpHandle = (event) => {
    //keycode === 13 => Enter
    if(event.keyCode === 13) {
        generrateTodoObj();
    }
}

const checkedOnChangeHandle = (target) => {
    ToDoListService.getInstance().setCompletStatus(target.value, target.checked);

}

const modifyTodoOnClickHandle = (target) => {
    openModal();
    modifyModal(ToDoListService.getInstance().getTodoById(target.value));

}

const deleteTodoOnClickHandle = (target) => {
    ToDoListService.getInstance().removeTodo(target.value);
}

const generrateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;
    
    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtils.toStringByFormatting(new Date()),
        //completStatus: true => 체크박스가 체크된 상태로 생성된다
        completStatus: false
    };

    ToDoListService.getInstance().addTodo(todoObj);
}

class ToDoListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new ToDoListService();
        }
        return this.#instance;
    }
    
    todoList = new Array();
    todoIndex = 1;
    
    constructor() {
        this.loadTodoList();
    }

    // JSON.parse(제이슨문자열) : 제이슨 문자열 -> 객체
    // JSON.stringify(객체): 객체 -> 제이슨 문자열
    // 객체로 들어있어야 수정이 가능하다(제이슨 문자열은 .으로 들어가 수정하는 것이 불가)
    loadTodoList() {
        //값이 있으면(true) 값을 그대로 가지고 오고 값이 없으면(false) 비어있는 배열을 생성
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        //[]?.id = ?는 []의 값이 null이면 .id를 하지 않겠다는 의미 => 
        //this.todoList[this.todoList.length - 1]?.id의 값이 true면 그 값+1을 가지고오고
        //false(= 객체가 없을때)면 1을 준다
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length - 1].id + 1 : 1
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        // console.log(this.todoList);
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id)));
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);

        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id: this.todoIndex  //id값을 바꿔줌
        }

        this.todoList.push(todo);
       
        //localStorage에는 객체를 제이슨 문자열로 저장
        this.saveLocalStorage();
       
        this.updateTodoList();

        this.todoIndex++;
    }

    setCompletStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            //매개변수 id = 문자열 -> 숫자로 변환(자료형 맞추기)해야 true로 바뀐다(===을 사용했기 때문에 자료형과 값이 모두 같아야 한다)
            if(todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }

    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }
        
        this.saveLocalStorage();
       
        this.updateTodoList();
    }

    removeTodo(id) {
        //map과 비슷, 조건이 true면 배열에 넣어준다 
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }

    updateTodoList() {
        const todolistMainContainer = document.querySelector(".todolist-main-container");

        todolistMainContainer.innerHTML = this.todoList.map(todo => {
            return `
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" 
                        ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"></label>
                    </div>
                    <div class="item-center">
                        <pre class="todolist-content">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <p class="todolist-date">${todo.createDate}</p>
                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);">수정</button>
                            <button class="btn btn-remove" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);">삭제</button>
                        </div>
                    </div>
                </li>`
            ;
        }).join("");
    }

}