document.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const toDoUl = document.getElementById("todos");
    
    const todos = JSON.parse(localStorage.getItem("todos"));
    document.getElementById("date").innerHTML = new Date().toDateString();
    // get todo's from localStorage
    if(todos){
        todos.forEach((todo) =>{
            addToDo(todo);
        });
    }

    // event listener for the form
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addToDo();
    });

    function addToDo(todo) {
        let toDoText = input.value;

        if (todo) {
          toDoText = todo.text;
        }
    
        if(toDoText){
            const todoEl = document.createElement("li");
            todoEl.innerText = toDoText;
            if (todo && todo.completed) {
              todoEl.classList.add("completed");
            }
            todoEl.innerText = toDoText;

            todoEl.addEventListener("click", () =>{
                todoEl.classList.toggle("completed");
                update();
            })

            todoEl.addEventListener("contextmenu", (e) =>{
                e.preventDefault();
                todoEl.remove();
                update();
            })
            toDoUl.append(todoEl);
            input.value = "";
            update();
        }
    }

    function update(){
        const toDosEL = document.querySelectorAll("li");

        const todos = [];

        toDosEL.forEach((todoEL) => {
          todos.push({
            text: todoEL.innerText,
            completed: todoEL.classList.contains("completed"),
          });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
})