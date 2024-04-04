const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    
    if(inputBox.value === ''){
        alert("You must write a task for it to be added!");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.draggable = true;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

listContainer.addEventListener("dragstart", function (event) {
    if (event.target.tagName === "LI") {
        dragged = event.target;
        event.dataTransfer.setData("text/plain", null);
    }
});

listContainer.addEventListener("dragover", function (event) {
    event.preventDefault();
    if (event.target.tagName === "LI") {
        const boundingBox = event.target.getBoundingClientRect();
        const offset = boundingBox.y + boundingBox.height / 2 > event.clientY ? "start" : "end";
        listContainer.insertBefore(dragged, offset === "start" ? event.target : event.target.nextSibling);
    }
});

listContainer.addEventListener("dragend", function () {
    dragged = null;
    saveData();
});

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function handleKeyPress(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
        addTask();
    }
}

showTasks();