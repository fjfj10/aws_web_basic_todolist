const openModal = () => {
    const modal = document.querySelector(".modal");

    if(modal.classList.contains("invisible")) {
        modal.classList.remove("invisible")
        modal.innerHTML = "";
    }
}

const closeModal = () => {
    const modal = document.querySelector(".modal");

    if(!modal.classList.contains("invisible")) {
        modal.classList.add("invisible")
    }
}

const modifySubmitButtonOnClick = (id) => {
    const newTodoContent = document.querySelector(".modify-content").value;
    const newTodoDate = document.querySelector(".modify-date").value;
    const todo = TodoListService.getInstance().getTodoById(id);

    if ((todo.todoContent === newTodoContent && todo.todoDate === newTodoDate) || !newTodoContent || !newTodoDate) {
        return;
    }
    const todoObj = {
        ...todo,
        todoContent: newTodoContent,
        todoDate: newTodoDate
    }
    TodoListService.getInstance().setTodo(todoObj);

}

const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");
    modal.innerHTML = `
        <div class="modal-container">
            <header>
                <h1 class="modal-title">Todo수정</h1>
            </header>
            <div class="modal-input-container">
                <input type="date" class="modify-date" value="${todo.todoDate}">
                <input type="text" class="modify-content" value="${todo.todoContent}">
            </div>
            <footer class="modal-buttons">
                <button class="mbtn" onclick="modifySubmitButtonOnClick(${todo.id}); closeModal();">확인</button>
                <button class="mbtn" onclick="closeModal();">취소</button>
            </footer>
        </div>
    `;
}