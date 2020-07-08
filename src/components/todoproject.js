export const todoProject = (name) => {
  let projectStatus = 'open';
  const projectItems = [];
  const getName = () => name;
  const getProjectItems = () => projectItems;
  const closeProject = () => {
    if (projectItems.length === 0) {
      projectStatus = 'close';
      return true;
    }
    return false;
  };
  const changeName = (newName) => { name = newName; };
  const addItem = (item) => { projectItems.push(item); };
  const removeItem = (itemId) => {
    if (itemId <= projectItems.length - 1) {
      projectItems.splice(itemId, 1);
      return true;
    }
    return false;
  };
  return {
    getName,
    getProjectItems,
    closeProject,
    changeName,
    addItem,
    removeItem,

  };
};

export default todoProject;