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
// console.log(testProject.content)

//create and assign
const guitar = factoryToDo("Practise guitar", "work hard for 5 minutes and do scales", "today", "high")
const football = factoryToDo("Practise football", "Score many goals", "tomorrow", "low")
// console.log(guitar)

assignToDo(guitar, testProject.content)
assignToDo(football, testProject.content)
// console.log(testProject.content)

// projects.groupProject(testProject)

projects.groupProject(testProject)
projects.groupProject(secondProject)
console.log(projects.all.Learning.content['Practise guitar'])

/// Start handling frontEnd shit
const content = document.querySelector("#content")
const addProjectBtn = document.querySelector("#add-project-btn")

function componentAddProjectDialog() {
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
    dialog.appendChild(input)

    const confirmButton = document.createElement("button")
    confirmButton.textContent = "Confirm"
    confirmButton.addEventListener("click", function() {
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
  
addProjectBtn.addEventListener("click", componentAddProjectDialog)