import { todoProject } from './todoproject';
import todoItem from './todoitem';

export const todoBook = (username) => {
    let projects = [];
    let projectId = -1;
    let selectedProject = -1;
    let editing = false;

    const setEditing = () => { editing = true; };
    const getEditing = () => editing;
    const clearEditing = () => { editing = false; };
    const setProjects = (arr) => {
        projects = arr;
    }
    const getUser = () => username;
    const changeUser = (newUsername) => {
        username = newUsername;
    };

    const newProjectId = () => {
        projectId += 1;
        return projectId;
    };

    const addProject = (name) => {
        newProjectId();
        const project = todoProject(name, projectId);
        projects.push(project);
        return project;
    };

    const initialize = () => {
        addProject('default');
    };

    const getProjects = () => projects;
    const getSingleProject = (index) => projects[index];

    const projectExists = (project) => {
        return projects.some(function(current) {
            return current.getName().toLowerCase() === project.getName().toLowerCase()
        });
    }

    const removeProject = (projectId) => {
        console.log("rmeove proj" + projectId);
        if (projectId === '0') {
            return false;
        } else {
            if (projectId <= projects.length - 1) {
                projects.splice(projectId, 1);
                return true;
            }
        }
        return false;
    };
    const clearProjects = () => {
        projects = [];
    };

    const setDomSelectedProject = (project) => {
        selectedProject = project;
    };

    const getDomSelectedProject = () => {
        return selectedProject;
    };

    const convertJSONtoProjects = (json) => {
        json.projects.forEach(element => {
            let project_to_add = addProject(element.name);
            element.items.forEach(item => {
                let item_to_add = todoItem(item.title, item.description, new Date(item.dueDate), item.priority);
                project_to_add.addItem(item_to_add);
            });
        });
    }

    return {
        getUser,
        changeUser,
        initialize,
        getProjects,
        getSingleProject,
        addProject,
        projectExists,
        removeProject,
        clearProjects,
        setDomSelectedProject,
        getDomSelectedProject,
        setEditing,
        getEditing,
        clearEditing,
        setProjects,
        convertJSONtoProjects,
    };
}

export default todoBook;