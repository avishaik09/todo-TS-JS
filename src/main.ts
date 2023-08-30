import "./style.css";

interface ITodo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}
// const todos:Array<ITodo> =[]

const todos: ITodo[] = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementById("title") as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: ITodo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.floor(Math.random() * 100)),
  };
  todos.push(todo);

  todoInput.value = "";
  console.log(todos);
  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  //creating checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find(item=>{
      if(item.id===id) item.isCompleted=checkBox.checked;
    })

    paragraph.className=isCompleted?"textCut":"";
    
  }
  //creating p for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className=checkBox.checked?"textCut":"";
  //creating delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick=() => {deleteTodo(id)}

  //appending to todo item

  todo.append(checkBox, paragraph, btn);
  todosContainer.appendChild(todo);
};

const deleteTodo = (id:string) => {
  const index=todos.findIndex(item=>item.id ===id)
todos.splice(index, 1);
renderTodo(todos)
}
const renderTodo = (todos: ITodo[]) => {
  todosContainer.innerText="";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
