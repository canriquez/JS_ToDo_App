export const Storage = (() => {
  const storeObject = (obj) => {
    localStorage.setItem('book', JSON.stringify(obj));
  };
  const getObjectStorage = () => {
    if (localStorage.getItem('book')) {
      return JSON.parse(localStorage.getItem('book'));
    }
    return false;
  };
  const clearStorage = () => {
    localStorage.removeItem('book');
  };

  const saveBook = (book) => {
    const projectsInBook = book.getProjects();
    const bookProject = {};
    let arrayOfItemsInProject = [];
    let item;
    const arrayProjectsToSave = [];

    for (let i = 0; i < projectsInBook.length; i += 1) {
      arrayOfItemsInProject = projectsInBook[i].getProjectItems();
      const projectObject = {};
      projectObject.name = projectsInBook[i].getName();
      projectObject.projectId = projectsInBook[i].getProjectId();

      const arrayItemsToSave = [];
      for (let j = 0; j < arrayOfItemsInProject.length; j += 1) {
        const jsonItem = {};
        item = arrayOfItemsInProject[j];
        jsonItem.title = item.getTitle();
        jsonItem.description = item.getDescription();
        jsonItem.dueDate = item.getDueDate();
        jsonItem.priority = item.getPriority();
        jsonItem.status = item.getStatus();
        jsonItem.projectId = item.getProjectId();
        arrayItemsToSave.push(jsonItem);
      }
      projectObject.items = arrayItemsToSave;
      arrayProjectsToSave.push(projectObject);
    }

    bookProject.projects = arrayProjectsToSave;
    storeObject(bookProject);
  };

  return {
    getObjectStorage,
    storeObject,
    clearStorage,
    saveBook,
  };
})();
export default Storage;