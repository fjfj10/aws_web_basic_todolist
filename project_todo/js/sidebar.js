sidebarToggleButtonOnClick = () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");

    if(sidebar.classList.contains("isSidebarOpen")) {
        sidebar.classList.remove("isSidebarOpen");
        sidebarToggleButton.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
    }else {
        sidebar.classList.add("isSidebarOpen");
        sidebarToggleButton.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
    }
}

sidebarButtonOnClick = (target) => {
    switch (target.innerHTML) {
        case "Title":
            Routes.getInstance().routesState = "Title";
            break;
    
        case "ToDoList":
            Routes.getInstance().routesState = "ToDoList";
            break;
    }

    Routes.getInstance().show();
    sidebarToggleButtonOnClick();
}