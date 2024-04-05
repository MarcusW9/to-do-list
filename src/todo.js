
// The class of todo objects
export class ToDo {
    constructor(title, description, date, priority, notes="No notes") {
        this.title = title,
        this.description = description,
        this.dueDate = date,
        this.priority = priority
        this.notes = notes
    }
}

// A factory function to create a todo object using the class 
export function factoryToDo(title, description, date, priority, notes) {
    const todo = new ToDo(title, description, date, priority, notes)
    return todo
}

// Assign a created todo to a project 
export function assignToDo(todo, project) {
    if (!project[todo.title]) {
        project[todo.title] = todo
    } else {
        console.log("Please rename")
    }
}

// export function assignToDo(todo, project) {
//     for (let key of project.content) {
//         if (!project.content)
//     }
// }