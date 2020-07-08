import todoProject from './todoproject';

export const todoBook = (username) => {
  const projects = [];
  const getUser = () => username;
  const changeUser = (newUsername) => {
    username = newUsername;
  };
  const initialize = () => {
    const project = todoProject('default');
    addProject(project);
  };
  const getProjects = () => projects;
  const getSingleProject = (index) => projects[index];
  const addProject = (project) => { projects.push(project); };
  const removeProject = (projectId) => {
    if (projectId <= project.length - 1) {
      project.splice(projectId, 1);
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