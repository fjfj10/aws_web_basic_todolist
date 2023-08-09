const titlecreateTodoButtonOnClickHandle = () => {
    titlegenerrateTodoObj();
}

const titlegenerrateTodoObj = () => {
    const todoContent = document.querySelector(".title-create-todo-content").value;
    const todoDate = document.querySelector(".title-create-todo-date").value;

    console.log(todoContent);
    console.log(todoDate);

    const todoObj = {
        id: 0,
        todoContent: todoContent,
        todoDate: todoDate,
        completStatus: false
    };
    TodoListService.getInstance().addTodo(todoObj);

    alert( todoDate + '에 ' + todoContent + '가 일정으로 등록되었습니다.')

    
}