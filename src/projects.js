
export const projects = (function allProjects() {
    const all = {}

    function createProject(name) {
        if (!this.all[name]) {
        const newProject = new Project(name)
        return newProject
        } else {
            alert ("This name is already Taken")
        }
    }

    function groupProject(project) {
        if (!all[project.name]) {
            all[project.name] = project
        }
    }
    return { all, createProject, groupProject } 
})()

export class Project {
    constructor(name) {
        this.content = {};
        this.name = name;
    }
}
