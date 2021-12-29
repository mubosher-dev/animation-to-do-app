const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
let todos;
function addTodo(e){
    // Prevent default form submit page not reload
    e.preventDefault();
    if(todoInput.value !== ''){
                
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li 
        const newTodo = document.createElement("li");
        newTodo.textContent = `${todoInput.value}`;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo)
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn);
        const trashedBtn = document.createElement('button');
        trashedBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        trashedBtn.classList.add('trashed-btn');
        todoDiv.appendChild(trashedBtn);
        // Add todo localstorage
        saveLocalTodos(todoInput.value)
        // Append to list
        todoList.appendChild(todoDiv);

        setTimeout(()=> {
            todoInput.value = '';
        },100)
    
    }
    else{
        alert("Please write a form")
    }
}

function deleteCheck(e){
    const item = e.target;
    console.log(e);
    if(item.classList[0] === 'trashed-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall')
        removeTodoLocalStorage(todo)
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        })
    }
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    localStorage.setItem("todos",JSON.stringify(todos));
    todos.forEach(function(todo){
        if(todo !== ''){
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            //create li 
            const newTodo = document.createElement("li");
            newTodo.innerText = `${todo}`;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo)
            const completedBtn = document.createElement('button');
            completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
            completedBtn.classList.add('complete-btn');
            todoDiv.appendChild(completedBtn);
            const trashedBtn = document.createElement('button');
            trashedBtn.innerHTML = `<i class="fas fa-trash"></i>`;
            trashedBtn.classList.add('trashed-btn');
            todoDiv.appendChild(trashedBtn);
            // Add todo localstorage
            saveLocalTodos(todoInput.value)
            // Append to list
            todoList.appendChild(todoDiv);
        }
    })
}
function removeTodoLocalStorage(todo){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click',filterTodo)
window.addEventListener('load', getTodos);
