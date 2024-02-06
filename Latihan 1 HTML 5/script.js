document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addToDoItem);

    var toDoList = document.querySelector(".todo-list");

    function newToDoItem(itemText, completed) {
        var toDoItem = document.createElement("li");
        var toDoText = document.createTextNode(itemText);
        toDoItem.appendChild(toDoText);

        if (completed) {
            toDoItem.classList.add("completed");
        }

        toDoList.appendChild(toDoItem);
        toDoItem.addEventListener("dblclick", toggleToDoItemState);
    }

    function addToDoItem() {
        var toDoEntryBox = document.getElementById("todo-entry-box");
        var itemText = toDoEntryBox.value;
        if(itemText !== "") { // Prevent adding empty items
            newToDoItem(itemText, false);
            toDoEntryBox.value = ""; // Clear input box after adding
        }
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

    window.emptyList = function() { // Make sure it's accessible globally
        var toDoItems = toDoList.children;
        while (toDoItems.length > 0) {
            toDoItems.item(0).remove();
        }
    };

    window.saveList = function() { // Make sure it's accessible globally
        var toDos = [];
        for (var i = 0; i < toDoList.children.length; i++) {
            var toDo = toDoList.children.item(i);
            var toDoInfo = {
                "task": toDo.innerText,
                "completed": toDo.classList.contains("completed")
            };
            toDos.push(toDoInfo);
        }
        localStorage.setItem("toDos", JSON.stringify(toDos));
    };

    function loadList() {
        if (localStorage.getItem("toDos") !== null) {
            var toDos = JSON.parse(localStorage.getItem("toDos"));
            for (var i = 0; i < toDos.length; i++) {
                var toDo = toDos[i];
                newToDoItem(toDo.task, toDo.completed);
            }
        }
    }

    loadList(); // Load saved todos on page load
});
