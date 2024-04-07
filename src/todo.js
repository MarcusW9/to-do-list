
// The class of todo objects
export class ToDo {
    constructor(title, description, date, priority, notes="No notes") {
        this.title = title,
        this.description = description,
        this.dueDate = date,
        this.priority = priority
        this.notes = notes
    }

    editTitle(newTitle) {
        this.title = newTitle
    }

    editDescription(newDescription) {
        this.description = newDescription;
    }

    editDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    editPriority(newPriority) {
        this.priority = newPriority;
    }

    editNotes(newNotes) {
        this.notes = newNotes;
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
        alert("This name is already taken")
    }
}

export function removeToDo() {
    delete project.content[toDoName];
};