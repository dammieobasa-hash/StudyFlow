const task = document.getElementById("taskInput");
const subject = document.getElementById("subjectInput");
const deadline = document.getElementById("deadlineInput");
const priority = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const tasksDiv = document.getElementById("tasksdiv")
const allTasks = document.getElementById("allTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const searchInput = document.getElementById("searchInput");
let tasks = []


allTasks.addEventListener("click", function () {
    const allTasks = tasks;
    tasksDiv.innerHTML = "";
    allTasks.forEach(task => {
        displayTask(task);
    });

})

pendingTasks.addEventListener("click", function () {
    const pendingTasks = tasks.filter(task => task.status === "pending");
    tasksDiv.innerHTML = "";
    pendingTasks.forEach(task => {
        displayTask(task);

    })
})

completedTasks.addEventListener("click", function () {
    const completedTasks = tasks.filter(task => task.status === "completed");
    tasksDiv.innerHTML = "";
    completedTasks.forEach(task => {
        displayTask(task);
    })

})

addBtn.addEventListener("click", addTask)
priorityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = task.value.trim();
    const subjectText = subject.value.trim();
    const deadlineText = deadline.value.trim();
    const priorityText = priority.value.trim();


    if (
        taskText === "" ||
        subjectText === "" ||
        deadlineText === "" ||
        priorityText === ""
    ) {
        alert("Please fill all Information");
        return;
    }

    const newTask = {
        task: taskText,
        subject: subjectText,
        deadline: deadlineText,
        priority: priorityText,
        status: "pending"
    }
    tasks.push(newTask)

    localStorage.setItem("studyFlowTasks", JSON.stringify(tasks));

    displayTask(newTask)


    task.value = "";
    subject.value = "";
    deadline.value = "";
    priority.value = "";



}


function displayTask(task) {
    const div = document.createElement("div");
    const taskInfo = document.createElement("div");
    div.classList.add("task");


    taskInfo.textContent = `Task: ${task.task}, Subject: ${task.subject}, Deadline: ${task.deadline}, Priority: ${task.priority}`;
    div.appendChild(taskInfo);
    tasksDiv.appendChild(div);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        const index = tasks.indexOf(task);


        // Remove task from array
        tasks.splice(index, 1);

        localStorage.setItem(
            "studyFlowTasks",
            JSON.stringify(tasks)
        );

        div.remove();
    })

    div.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        const taskInput = document.createElement("input");
        const subjectInput = document.createElement("input");
        const deadlineInput = document.createElement("input");
        const priorityInput = document.createElement("input");
        taskInput.value = task.task;
        subjectInput.value = task.subject;
        deadlineInput.value = task.deadline;
        priorityInput.value = task.priority;
        taskInfo.innerHTML = "";
        taskInfo.appendChild(taskInput);
        taskInfo.appendChild(subjectInput);
        taskInfo.appendChild(deadlineInput);
        taskInfo.appendChild(priorityInput);

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "save 💾";
        taskInfo.appendChild(saveBtn);

        saveBtn.addEventListener("click", function () {

            task.task = taskInput.value.trim();
            task.subject = subjectInput.value.trim();
            task.deadline = deadlineInput.value.trim();
            task.priority = priorityInput.value.trim();

            taskInfo.textContent = `Task: ${task.task}, Subject: ${task.subject}, Deadline: ${task.deadline}, Priority: ${task.priority}`;
            


            localStorage.setItem(
                "studyFlowTasks",
                JSON.stringify(tasks)
            );

            
        })

        const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "cancel ❌";
            taskInfo.appendChild(cancelBtn);
             
            cancelBtn.addEventListener("click", function () {
taskInfo.textContent = `Task: ${task.task}, Subject: ${task.subject}, Deadline: ${task.deadline}, Priority: ${task.priority}`;
            

                
            })



    })
    div.appendChild(editBtn);


    const completeCheckBox = document.createElement("input");
    completeCheckBox.type = "checkbox";

    if (task.status === "completed") {
        completeCheckBox.checked = true;
    }

    const span = document.createElement("span");
    span.textContent = "Complete";
    div.appendChild(span);


    completeCheckBox.addEventListener("change", function () {
        if (completeCheckBox.checked) {
            div.classList.add("completed");
            task.status = "completed";


        } else {
            div.classList.remove("completed");
            task.status = "pending";
        }
        localStorage.setItem(
            "studyFlowTasks",
            JSON.stringify(tasks)
        );

    })



    div.appendChild(completeCheckBox);

}


const savedTasks = localStorage.getItem("studyFlowTasks");


if (savedTasks) {

    // Convert JSON back into JavaScript array
    tasks = JSON.parse(savedTasks);


    // Display every saved task
    tasks.forEach(function (task) {

        displayTask(task);

    });

}

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        return (
            task.task.toLowerCase().includes(searchTerm) ||
            task.subject.toLowerCase().includes(searchTerm) ||
            task.deadline.toLowerCase().includes(searchTerm) ||
            task.priority.toLowerCase().includes(searchTerm)
        );
    });
    tasksDiv.innerHTML = "";
    filteredTasks.forEach(task => {
        displayTask(task);
    });


})

