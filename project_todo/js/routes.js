class Routes {
    static #instance = null;

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new Routes();
        }
        return this.#instance;
    }

    routesState = "Title"

    show() {
        this.clear();

        switch (this.routesState) {
            case "Title":
                const welcomePage = document.querySelector(".welcome-page");
                    welcomePage.classList.remove("invisible");
                break;
        
            case "ToDoList":
                const todoListPage = document.querySelector(".todo-list-page");
                    todoListPage.classList.remove("invisible");
                break;
        }
    }

    clear() {
        const pages = document.querySelectorAll(".main-container > div");
        pages.forEach(page => {
            page.classList.add("invisible")
        });
    }
}