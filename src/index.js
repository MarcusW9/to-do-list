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
import { ToDo, factoryToDo, assignToDo} from './todo.js'
// const example = format(new Date(2014, 1, 11), "yyyy-MM-dd");
// console.log(example)

//create project
const testProject = new Project("Learning")
const secondProject = new Project("Gym")
const thirdProject = projects.createProject("This is the new one")

//create and assign
const guitar = factoryToDo("Practise guitar", "work hard for 5 minutes and do scales", "today", "high")
const football = factoryToDo("Practise football", "Score many goals", "tomorrow", "low")
// console.log(guitar)

assignToDo(guitar, testProject.content)
assignToDo(football, testProject.content)

projects.groupProject(testProject)
projects.groupProject(secondProject)
projects.groupProject(thirdProject)
// console.log(projects.all.Learning.content['Practise guitar'])

/// Start handling frontEnd stuff
const content = document.querySelector("#content")
const addProjectBtn = document.querySelector("#add-project-btn")
const toDoDialog = document.querySelector("#add-todo-dialog")

// Responsible for displaying all projects (existing already)
const displayProjects = (projects) => { for (let key in projects) {
   
    const project = document.createElement("div")
    project.id = `${projects[key].name.replace(/\s/g, "-")}`
    project.classList.add("project-card") 
    
    const projectHeader = document.createElement("div")
    project.appendChild(projectHeader)

    const projectName = document.createElement("p")
    projectName.textContent = `${projects[key].name}`
    projectHeader.appendChild(projectName)

    const addToDoBtn = document.createElement("button")
    addToDoBtn.classList.add("add-todo-btns")
    addToDoBtn.textContent = "Add To-do"
    addToDoBtn.addEventListener("click", () => {
        toDoDialog.setAttribute("data-project", `${projects[key].name.replace(/\s/g, "-")}`)
        toDoDialog.showModal()
    })
    projectHeader.appendChild(addToDoBtn)

    const projectCardContent = document.createElement("div")
    projectCardContent.id = `${projects[key].name.replace(/\s/g, "-")}-content`
    projectCardContent.classList.add("project-card-content")
    project.appendChild(projectCardContent)

    content.appendChild(project)
}
}
  
displayProjects(projects.all)

// BUTTON TO ADD A NEW PROJECT 

addProjectBtn.addEventListener("click", componentAddProjectDialog)

// CORRESPONDING DIALOG OPENED TO CREATE A PROJECT

function componentAddProjectDialog() {

    let projectName;

    const dialog = document.createElement("dialog")
    dialog.id = "add-project-dialog"
    
    const paragraph = document.createElement("p")
    paragraph.id = "add-project-dialog-p"
    paragraph.textContent = "Enter the name of your project"
    dialog.appendChild(paragraph)

    const value = document.createElement("label")
    value.setAttribute("for", "add-project-dialog-input")
    dialog.appendChild(value)

    const input = document.createElement("input")
    input.id = "add-project-dialog-input"
    input.addEventListener("input", (e) => {projectName = (e.target.value)})
    dialog.appendChild(input)

    // This button is responsible for confirming the creation of a new Project
    const confirmButton = document.createElement("button")
    confirmButton.textContent = "Confirm"
    confirmButton.addEventListener("click", function() {
        // refers to projects.js to create a project 
        const newProject = projects.createProject(projectName)
        projects.groupProject(newProject)
        content.innerHTML = "";
        displayProjects(projects.all)
        dialog.close()
    })
    dialog.appendChild(confirmButton)

    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel" 
    cancelButton.addEventListener("click", function() {
        dialog.close()
    })
    dialog.appendChild(cancelButton)

    content.appendChild(dialog)
    dialog.showModal()
}

// grab the values of the toDo dialog
const toDoDialogValues = () => {
    const toDoDialog = document.getElementById("add-todo-dialog");
    const titleInput = document.getElementById("add-todo-title");
    const descriptionInput = document.getElementById("add-todo-description");
    const dateInput = document.getElementById("add-todo-date");
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
const confirmButton = document.getElementById("confirm-todo");
const cancelButton = document.getElementById("cancel-todo");

// Create a new todo with the information gathered from the dialog
cancelButton.addEventListener("click", () => {toDoDialog.close()})
confirmButton.addEventListener("click", () => {

    const { title, description, date, priority, notes } = toDoDialogValues()

    if (!title || !description || !date || !priority || !notes) {
        alert("Please enter valid information")
    } else {
        let todo = factoryToDo(title, description, date, priority, notes) 
        let dataProject = toDoDialog.getAttribute("data-project")
        let projectName = dataProject.replace(/-/g, " ")
        assignToDo(todo, projects.all[projectName].content)
        // console.log(projects.all[projectName].content)
        displayToDos()
        toDoDialog.close()
    }
    // console.log(projects.all[`${toDoDialog.getAttribute("data-project")}`].content)
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

                // Append details elements to todo div
                toDoCard.appendChild(title);
                toDoCard.appendChild(description);
                toDoCard.appendChild(dueDate);
                toDoCard.appendChild(priority);
                toDoCard.appendChild(notes);

                toDoContainer.appendChild(toDoCard);
                projectCardContent.appendChild(toDoContainer)
            })
        })
    }

displayToDos()