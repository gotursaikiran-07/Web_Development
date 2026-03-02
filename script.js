const addBtn=document.getElementById("addBtn");
const taskInput=document.getElementById("taskInput");
const taskList=document.getElementById("taskList");
const filters=document.querySelectorAll(".filter");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
let currentFilter="all";

addBtn.addEventListener("click",addTask);
filters.forEach(btn=>btn.addEventListener("click",changeFilter));

function addTask(){
  if(taskInput.value.trim()==="")return;

  tasks.push({text:taskInput.value,completed:false});
  taskInput.value="";
  saveAndRender();
}

function renderTasks(){
  taskList.innerHTML="";

  tasks
    .filter(task=>{
      if(currentFilter==="pending")return !task.completed;
      if(currentFilter==="completed")return task.completed;
      return true;
    })
    .forEach((task,index)=>{

      const li=document.createElement("li");

      let actionButtons=`
        <button class="complete"><i class="fas fa-check"></i></button>
      `;

      // delete only if completed
      if(task.completed){
        actionButtons+=`
          <button class="delete"><i class="fas fa-trash"></i></button>
        `;
      }

      li.innerHTML=`
        <span>${task.text}</span>
        <div class="actions">${actionButtons}</div>
      `;

      if(task.completed)li.classList.add("completed");

      li.querySelector(".complete").onclick=()=>{
        tasks[index].completed=!tasks[index].completed;
        saveAndRender();
      };

      const deleteBtn=li.querySelector(".delete");
      if(deleteBtn){
        deleteBtn.onclick=()=>{
          tasks.splice(index,1);
          saveAndRender();
        };
      }

      taskList.appendChild(li);
    });
}

function changeFilter(e){
  filters.forEach(btn=>btn.classList.remove("active"));
  e.target.classList.add("active");
  currentFilter=e.target.dataset.filter;
  renderTasks();
}

function saveAndRender(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
  renderTasks();
}

renderTasks();