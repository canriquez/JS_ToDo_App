import { todoProject } from './todoproject';

export const todoBook = (username) => {
    let projects = [];
    let projectId = -1;
    let selectedProject = -1;
    let editing = false;

    const setEditing = () => { editing = true; };
    const getEditing = () => editing;
    const clearEditing = () => { editing = false; };

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
    };
};

export default todoBook;