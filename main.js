var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

function addToDoItem() {
    alert("Add button clicked!");
}

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, deadline, completed) {
    var toDoItem = document.createElement("li");

    var toDoText = document.createElement("span");
    toDoText.textContent = itemText;

    var deadlineText = document.createElement("span");
    deadlineText.textContent = deadline ? ` (Deadline: ${deadline})` : "";
    deadlineText.style.fontStyle = "italic";
    deadlineText.style.marginLeft = "10px";
    deadlineText.style.color = "#666";

    toDoItem.appendChild(toDoText);
    toDoItem.appendChild(deadlineText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}


function addToDoItem() {
    var itemText = toDoEntryBox.value;
    var deadline = document.getElementById("deadline-entry-box").value;
    newToDoItem(itemText, deadline, false);
}


function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

var myArray = [];
myArray.push("something to store");
myArray.push("something else to store");
alert(myArray[0]);
//This will alert "something to store"

var toDoInfo = {
    "task": "Thing I need to do",
    "completed": false
};

function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);
        var taskText = toDo.children[0].textContent;
        var deadlineText = toDo.children[1].textContent.replace(" (Deadline: ", "").replace(")", "");

        var toDoInfo = {
            "task": taskText,
            "deadline": deadlineText || "",
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}


function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.deadline, toDo.completed);
        }
    }
}


loadList();