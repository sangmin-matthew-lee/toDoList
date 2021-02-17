// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const toDoForm = document.querySelector(".js-toDoForm");
const input = toDoForm.querySelector("input");
const listPending = document.querySelector(".js-toDoList-pending");
const listFinished = document.querySelector(".js-toDoList-finished");

const LS_TODOS_PENDING = "PENDING";
const LS_TODOS_FINISHED = "FINISHED";
let PENDING = [];
let FINISHED = [];
//const newId = PENDING.length+1;
//

function deleteFromPending(event){
    const btn = event.target;
    const li = btn.parentNode;
    listPending.removeChild(li);        //web

    //local storage
    const cleanToDo = PENDING.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanToDo;
    savePendingToDos();
}

function deleteFromFinished(event){
    const btn = event.target;
    const li = btn.parentNode;
    listFinished.removeChild(li);        //web

    //local storage
    const cleanToDo = FINISHED.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    FINISHED = cleanToDo;
    saveFinishedToDos();
}

function moveFromPending(event){
    const btn = event.target;
    const li = btn.parentNode;
    const idFromPending = li.id;
    console.log("ID of clicked btn: ",idFromPending);
    const textFromPending = PENDING[idFromPending-1].text;
    console.log("text of clicked btn: ", textFromPending);
    window.location.reload();
    //get obj of btn and print on Finished web
    paintFinishedToDo(textFromPending);

    //remove from pending
    listPending.removeChild(li);
    const cleanToDo = PENDING.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanToDo;
    savePendingToDos();
}

function moveFromFinished(event){
    const btn = event.target;   
    const li = btn.parentNode;
    const idFromFinished = li.id;
    console.log("ID of clicked btn: ",idFromFinished);
    const textFromFinished = FINISHED[idFromFinished-1].text;
    console.log("text of clicked btn: ", textFromFinished);
    window.location.reload();
    //get obj of btn and print on pending web
    paintPendingToDo(textFromFinished)
    
    //remove from finished
    listFinished.removeChild(li);
    const cleanToDo = FINISHED.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    FINISHED = cleanToDo;
    saveFinishedToDos();
}

function savePendingToDos(){
    localStorage.setItem(LS_TODOS_PENDING, JSON.stringify(PENDING));
    
}

function saveFinishedToDos(){
    localStorage.setItem(LS_TODOS_FINISHED, JSON.stringify(FINISHED));
}

function paintPendingToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = PENDING.length+1;

  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click",deleteFromPending);
  doneBtn.innerHTML = "✔️";
  doneBtn.addEventListener("click", moveFromPending)
  
  span.innerText = text;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  listPending.appendChild(li);      //show on the web

  const toDoObj = {
    id: newId,
    text: text    
  };
  PENDING.push(toDoObj);            //show on the local storage
  savePendingToDos();
}

function paintFinishedToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const span = document.createElement("span");
    //const newId = PENDING.length+1;
    const newId = FINISHED.length+1;
  
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click",deleteFromFinished);
    returnBtn.innerHTML = "↩";
    returnBtn.addEventListener("click", moveFromFinished)
    
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(returnBtn);
    listFinished.appendChild(li);           //show on the web
    
    const toDoObj = {
      id: newId,
      text: text    
    };
    FINISHED.push(toDoObj);
    saveFinishedToDos();
  }

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintPendingToDo(currentValue);
  input.value = "";
}

function loadPedningToDo() {
  const pendingToDos = localStorage.getItem(LS_TODOS_PENDING);
  
  if (pendingToDos !== null) {
      const parsedPendingToDos = JSON.parse(pendingToDos);      //make string to object
      parsedPendingToDos.forEach(function(pendingToDo){         //show pending toDo
        paintPendingToDo(pendingToDo.text);
      })
  }
}


function loadFinishedToDo(){
    const finishedToDos = localStorage.getItem(LS_TODOS_FINISHED);
    if(finishedToDos !== null){
        const parsedFinishedToDos = JSON.parse(finishedToDos);
        parsedFinishedToDos.forEach(function(finishedToDo){
            paintFinishedToDo(finishedToDo.text);
        })
    }
}


function init() {
    loadPedningToDo();
    loadFinishedToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();