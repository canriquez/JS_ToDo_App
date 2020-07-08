export const todoItem = (title, description, dueDate, priority) => {
  let itemStatus = 'open';
  let idProject = 0;

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getStatus = () => itemStatus;

  const setProject = (projectid) => {
    idProject = projectid;
  };
  const getProjectId = () => idProject;

  const changePriority = (prio) => { priority = prio; };
  const completeItem = () => { itemStatus = 'complete'; };
  const openItem = () => { itemStatus = 'open'; };

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getStatus,
    getProjectId,
    setProject,
    changePriority,
    completeItem,
    openItem,
  };
};

export default todoItem;