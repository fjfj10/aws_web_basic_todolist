const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("invisible");

}

const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

const modifySubmitButtonOnClick = (id) => {
    const newTodoContent = document.querySelector(".modal-main .text-input").value;
    const todo = ToDoListService.getInstance().getTodoById(id);
    // !newTodoContent=빈칸이거나 todo.todoContent === newTodoContent=이름에 변화가 없을때
    if(todo.todoContent === newTodoContent || !newTodoContent) {
        return;
    }
    const todoObj = {
        ...todo,
        todoContent: newTodoContent
    }

    ToDoListService.getInstance().setTodo(todoObj);
}

const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");
    modal.innerHTML = `
        <div class="modal-container">
            <header class="modal-header">
                <h1 class="modal-title">
                    ToDo 수정
                </h1>
            </header>
            <main class="modal-main">
                <p class="modal-message">
                    ToDo를 수정해주세요.
                </p>
                <input type="text" class="text-input w-f" value="${todo.todoContent}">
            </main>
            <footer class="modal-footer">
                <button class="btn" onclick="modifySubmitButtonOnClick(${todo.id}); closeModal();">확인</button>
                <button class="btn" onclick="closeModal();">닫기</button>
            </footer>
        </div>
    `;
}