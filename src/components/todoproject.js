import { differenceInCalendarDays } from 'date-fns';

export const todoProject = (name, projectid) => {
  let projectStatus = 'open';
  const projectId = projectid;
  const projectItems = [];
  let editing = false;

  const setEditing = () => { editing = true; };
  const getEditing = () => editing;
  const clearEditing = () => { editing = false; };
  const getName = () => name;
  const setName = (newName) => { name = newName; };
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

  const addItem = (item) => {
    item.setProject(projectId);
    projectItems.push(item);
  };
  const itemExists = (item) => projectItems.some(
    (current) => current.getTitle().toLowerCase() === item.getTitle().toLowerCase(),
  );

  const removeItem = (itemId) => {
    if (itemId <= projectItems.length - 1) {
      projectItems.splice(itemId, 1);
      return true;
    }
    return false;
  };

  const getItemDueGroupsCount = () => {
    let report = [0, 0, 0];
    projectItems.forEach(item => {
      const result = differenceInCalendarDays(item.getDueDate(), new Date());
      if (result === 0 && item.getStatus() === 'open') {
        report[0] += 1;
      } else if (result === 1 && item.getStatus() === 'open') {
        report[1] += 1;
      } else if (item.getStatus() === 'open') {
        report[2] += 1;
      }
    });
    return report;
  };

  return {
    getName,
    getProjectId,
    getProjectItems,
    getProjectStatus,
    closeProject,
    addItem,
    itemExists,
    removeItem,
    setEditing,
    getEditing,
    clearEditing,
    setName,
    getItemDueGroupsCount,
  };
};

export default todoProject;