import { todoProject } from './todoproject';

export const todoBook = (username) => {
    let projects = [];
    let projectId = -1;
    let selectedProject = -1;
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
        return projects.some(function (current) {
            return current.getName().toLowerCase() === project.getName().toLowerCase()
        });
    }


    const removeProject = (projectId) => {
        if (projectId <= projects.length - 1) {
            projects.splice(projectId, 1);
            return true;
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
    };
};

export default todoBook;