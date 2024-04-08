//todos with title, description, dueDate and priority. 
// You might also want to include notes or even a checklist

// Your todo list should have projects or separate lists of todos.

// Make a project 
// Each project can have todos 
// Project is an array of todos
// each Todo is made of title, description, duedate, priority
import './styles.css';
import { compareAsc, format } from "date-fns";
import { projects, Project } from './projects.js';
import { ToDo, factoryToDo, assignToDo, removeToDo} from './todo.js'
import { toDoDialogComponent, refreshToDoDialog } from './tododialog.js';
// const example = format(new Date(2014, 1, 11), "yyyy-MM-dd");
// console.log(example)

toDoDialogComponent()

//create dummy project
const testProject = new Project("Learning")
const secondProject = new Project("Gym")

//create and assign
const guitar = factoryToDo("Practise guitar", "Work hard for 5 minutes and do scales", "Today", "High")
const football = factoryToDo("Practise football", "Score many goals", "Tomorrow", "Low")

assignToDo(guitar, testProject.content)
assignToDo(football, testProject.content)

projects.groupProject(testProject)
projects.groupProject(secondProject)

/// Start handling frontEnd stuff
const content = document.querySelector("#content")
const addProjectBtn = document.querySelector("#add-project-btn")
let toDoDialog = document.querySelector("#add-todo-dialog")

// Responsible for displaying all projects (existing already)
const displayProjects = (projects) => {
    for (let key in projects) {
        const project = document.createElement("div");
        project.id = `${projects[key].name.replace(/\s/g, "-")}`;
        project.classList.add("project-card");

        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
        project.appendChild(projectHeader);

        const projectName = document.createElement("p");
        projectName.classList.add("project-heading");
        projectName.textContent = `${projects[key].name}`;
        projectHeader.appendChild(projectName);

        const addToDoBtn = document.createElement("button");
        addToDoBtn.classList.add("add-todo-btns");
        addToDoBtn.textContent = "Add To-do";
        projectHeader.appendChild(addToDoBtn); // Append here, outside the event listener

        // set the dialog to and buttons to create a new todo (as opposed to editting)
        addToDoBtn.addEventListener("click", () => {
            refreshToDoDialog()
            let toDoDialog = document.querySelector("#add-todo-dialog");
            toDoDialog.setAttribute("data-project", `${projects[key].name.replace(/\s/g, "-")}`);
            toDoCancelButton(toDoDialog)
            let confirmButton = document.getElementById("confirm-todo");
            confirmButton.addEventListener("click", () => {
                const { title, description, date, priority, notes } = toDoDialogValues();

                if (!title || !description || !date || !priority || !notes) {
                    alert("Please enter valid information");
                } else {
                    let todo = factoryToDo(title, description, date, priority, notes);
                    let dataProject = toDoDialog.getAttribute("data-project");
                    let projectName = dataProject.replace(/-/g, " ");
                    assignToDo(todo, projects[projectName].content);
                    displayToDos();
                    toDoDialog.close();
                }
            });
            toDoDialog.showModal();
        });

        const projectCardContent = document.createElement("div");
        projectCardContent.id = `${projects[key].name.replace(/\s/g, "-")}-content`;
        projectCardContent.classList.add("project-card-content");
        project.appendChild(projectCardContent);

        content.appendChild(project);
    }
};

  
displayProjects(projects.all)

// BUTTON TO ADD A NEW PROJECT 

addProjectBtn.addEventListener("click", componentAddProjectDialog)

// CORRESPONDING DIALOG OPENED TO CREATE A PROJECT

function componentAddProjectDialog() {

    let projectName;

    const dialog = document.createElement("dialog")
    dialog.id = "add-project-dialog"

    const addProjectDialogContent =  document.createElement("div")
    addProjectDialogContent.id = "add-project-dialog-content"
    
    const paragraph = document.createElement("p")
    paragraph.id = "add-project-dialog-p"
    paragraph.textContent = "Enter the name of your project"
    addProjectDialogContent.appendChild(paragraph)

    const value = document.createElement("label")
    value.setAttribute("for", "add-project-dialog-input")
    addProjectDialogContent.appendChild(value)

    const input = document.createElement("input")
    input.id = "add-project-dialog-input"
    input.addEventListener("input", (e) => {projectName = (e.target.value)})
    addProjectDialogContent.appendChild(input)

    const addProjectDialogBtns = document.createElement("div")
    addProjectDialogBtns.classList.add("add-project-dialog-btns")

    // This button is responsible for confirming the creation of a new Project
    const confirmButton = document.createElement("button")
    confirmButton.textContent = "Confirm"
    confirmButton.addEventListener("click", function() {
        if (!projectName) {
            return alert("please enter a valid name")
        } else if (projects.all[projectName]) {
            alert("This name is already taken")
            return
        }
        // refers to projects.js to create a project 
        const newProject = projects.createProject(projectName)
        projects.groupProject(newProject)
        content.innerHTML = "";
        displayProjects(projects.all)
        displayToDos()
        dialog.close()
    })
    addProjectDialogBtns.appendChild(confirmButton)
    
    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel" 
    cancelButton.addEventListener("click", function() {
        dialog.close()
    })
    addProjectDialogBtns.appendChild(cancelButton)

    addProjectDialogContent.appendChild(addProjectDialogBtns)
    dialog.appendChild(addProjectDialogContent)

    content.appendChild(dialog)
    dialog.showModal()
}

// grab the values of the toDo dialog
const toDoDialogValues = () => {
    const toDoDialog = document.getElementById("add-todo-dialog");
    const titleInput = document.getElementById("add-todo-title");
    const descriptionInput = document.getElementById("add-todo-description");
    const dateInput = document.getElementById("add-todo-due-date");
    const priorityInput = document.getElementById("add-todo-priority");
    const notesInput = document.getElementById("add-todo-notes");

    const title = titleInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;
    const notes = notesInput.value;

    return { toDoDialog, title, description, date, priority, notes }
}


// Grab the buttons for the ToDo dialog so I can confirm or close
let confirmButton = document.getElementById("confirm-todo");
const toDoCancelButton = (toDoDialog) => {
    let cancelButton = document.getElementById("cancel-todo");
    cancelButton.addEventListener("click", () => {toDoDialog.close()})
}
// confirm button can either confirm a new todo or be used for editting the existing todo

// Create a new todo with the information gathered from the dialog
confirmButton.addEventListener("click", () => {
    confirmButtonCreate()
})

    const displayToDos = () => {
        Object.keys(projects.all).forEach((projectName) => {
            // take the name of the project and replace to ensure that there are brackets between multiworded names (for the attribute when we grab it)
            const projectCardContent = document.querySelector(`#${projectName.replace(/\s/g, "-")}-content`);
            projectCardContent.innerHTML = "";
            const project = projects.all[projectName]
            Object.keys(project.content).forEach((toDoName) => {
                const toDo = project.content[toDoName]

                const toDoContainer = document.createElement("div")

                const toDoCard = document.createElement("div");
                toDoCard.classList.add("todo-card");

                const toDoCardBody = document.createElement("div");
                toDoCardBody.classList.add("todo-card-body")

                const title = document.createElement("h3");
                title.textContent = `${toDo.title}`;

                const description = document.createElement("p");
                description.textContent = `Description: ${toDo.description}`;

                const dueDate = document.createElement("p");
                dueDate.textContent = `Due: ${toDo.dueDate}`;

                const priority = document.createElement("p");
                priority.textContent = `Priority: ${toDo.priority}`;

                const notes = document.createElement("p");
                notes.textContent = `Notes: ${toDo.notes}`;

                const todoBtns = document.createElement("div");
                todoBtns.classList.add("todo-btns-container")

                const viewBtn = document.createElement("button");
                viewBtn.classList.add("view-todo-btn")
                const viewIcon = document.createElement("div")
                viewIcon.classList.add("todo-btn-icons")
                viewIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>magnify-expand</title><path d="M18 16H17.42L16.61 15.19C17.5 14 18 12.5 18 11C18 7.13 14.87 4 11 4C9.5 4 8 4.5 6.79 5.4C3.7 7.72 3.07 12.11 5.39 15.2C7.71 18.29 12.1 18.92 15.19 16.6L16 17.41V18L21 23L23 21L18 16M11 16C8.24 16 6 13.76 6 11S8.24 6 11 6 16 8.24 16 11 13.76 16 11 16M3 6L1 8V1H8L6 3H3V6M21 1V8L19 6V3H16L14 1H21M6 19L8 21H1V14L3 16V19H6Z" /></svg>`
                viewBtn.appendChild(viewIcon)
                
                // set the dialog to and buttons to edit a new todo (as opposed to creating a new)
                const editBtn = document.createElement("button");
                editBtn.classList.add("edit-todo-btn")
                const editIcon = document.createElement("div")
                editIcon.classList.add("todo-btn-icons")
                editIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`
                editBtn.addEventListener("click", () => {
                    refreshToDoDialog()
                    let toDoDialog = document.querySelector("#add-todo-dialog")
                    toDoCancelButton(toDoDialog)
                    
                    let confirmButton = document.getElementById("confirm-todo");
                    confirmButton.addEventListener("click", function confirmButtonEdit() {
                        const { title, description, date, priority, notes } = toDoDialogValues()
                        if (!title || !description || !date || !priority || !notes) {
                            alert("Please enter valid information")
                        } else {
                            toDo.editToDo( title, description, date, priority, notes )
                            displayToDos()
                            toDoDialog.close()
                        }
                    })
                    toDoDialog.showModal()
                })
                editBtn.appendChild(editIcon)
                
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-todo-btn")
                const deleteIcon = document.createElement("div")
                deleteIcon.classList.add("todo-btn-icons")
                deleteIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`
                deleteBtn.addEventListener("click", () => {
                    delete project.content[toDoName]
                    displayToDos()
                })
                deleteBtn.appendChild(deleteIcon)

                // Append details elements to todo div
                toDoCardBody.appendChild(title);
                toDoCardBody.appendChild(description);
                toDoCardBody.appendChild(dueDate);
                toDoCardBody.appendChild(priority);
                toDoCardBody.appendChild(notes);

                toDoCard.appendChild(toDoCardBody)

                todoBtns.appendChild(viewBtn);
                todoBtns.appendChild(editBtn);
                todoBtns.appendChild(deleteBtn);

                toDoCard.appendChild(todoBtns)

                toDoContainer.appendChild(toDoCard);
                projectCardContent.appendChild(toDoContainer)
            })
        })
    }

displayToDos()