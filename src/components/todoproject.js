export const todoProject = (name, projectid) => {
  let projectStatus = 'open';
  const projectId = projectid;
  const projectName = name;
  const projectItems = [];

  const getName = () => projectName;
  const getProjectId = () => projectId;
  const getProjectItems = () => projectItems;
  const getProjectStatus = () => projectStatus;
  const closeProject = () => {
    if (projectItems.length === 0) {
      projectStatus = 'close';
      return true;
    }
    return false;
  };

  const changeName = (newName) => { name = newName; };

  const addItem = (item) => {
    item.setProject(projectId);
    projectItems.push(item);
  };

  const removeItem = (itemId) => {
    if (itemId <= projectItems.length - 1) {
      projectItems.splice(itemId, 1);
      return true;
    }
    return false;
  };
  return {
    getName,
    getProjectId,
    getProjectItems,
    getProjectStatus,
    closeProject,
    changeName,
    addItem,
    removeItem,

  };
};

export default todoProject;