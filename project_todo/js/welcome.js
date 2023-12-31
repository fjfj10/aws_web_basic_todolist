const titlecreateTodoButtonOnClickHandle = () => {
    titlegenerrateTodoObj();

    clearInputFields();
}

const titlecreateTodoOnKeyUpHandle = (event) => {
    if (event.keyCode === 13) {
        titlegenerrateTodoObj();
        
        clearInputFields();
    }
}

const titlegenerrateTodoObj = () => {
    const todoContent = document.querySelector(".welcome-create-todo .create-todo-content").value;
    const todoDate = document.querySelector(".welcome-create-todo .create-todo-date").value;

    if (todoContent != "" && todoDate != "" ) {
        const todoObj = {
            id: 0,
            todoContent: todoContent,
            todoDate: todoDate,
            completStatus: false
        };
        TodoListService.getInstance().addTodo(todoObj);
        // 일정 등록시 alert창으로 안내
        alert( todoDate + '에 ' + todoContent + '가 일정으로 등록되었습니다.')
    }else {
        alert("날짜와 내용을 모두 입력해주세요.")
    }


}