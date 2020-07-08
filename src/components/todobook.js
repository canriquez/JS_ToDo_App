import { todoProject } from './todoproject';

export const todoBook = (username) => {
  let projects = [];
  let projectId = -1;
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
  return {
    getUser,
    changeUser,
    initialize,
    getProjects,
    getSingleProject,
    addProject,
    removeProject,
    clearProjects,
  };
};

export default todoBook;