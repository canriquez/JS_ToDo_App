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
  };
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
  const setDomSelectedProject = (project) => { selectedProject = project; };
  const getDomSelectedProject = () => selectedProject;

  const getDomSelectedProjectObject = () => projects[selectedProject];

  const projectExists = (project) => projects.some(
    (current) => current.getName().toLowerCase() === project.getName().toLowerCase(),
  );

  const removeProject = (projectId) => {
    console.log(`rmeove proj${projectId}`);
    if (projectId === '0') {
      return false;
    }
    if (projectId <= projects.length - 1) {
      projects.splice(projectId, 1);
      return true;
    }

    return false;
  };
  const clearProjects = () => {
    projects = [];
    projectId = -1;
  };


  const convertJSONtoProjects = (json) => {
    // create index
    json.projects.forEach(element => {
      const projectToAdd = addProject(element.name);
      element.items.forEach(item => {
        const itemToAdd = todoItem(
          item.title,
          item.description,
          new Date(item.dueDate),
          item.priority,
          item.status,
        );
        projectToAdd.addItem(itemToAdd);
      });
    });
    console.log(`PROJECTS LENGTH :${projects.length}`);
    console.log(`HERE IS THE PROJECT read :${projects[0].getName()}`);
    console.log(json);
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
    setProjects,
    convertJSONtoProjects,
    getDomSelectedProjectObject,
  };
};

export default todoBook;