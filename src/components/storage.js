export const Storage = (() => {
  const storeObject = (obj) => {
    localStorage.setItem('book', JSON.stringify(obj));
  };
  const getObjectStorage = () => {
    console.log(`[existing stored object]: ${localStorage.book}`);
    if (localStorage.getItem('book')) {
      console.log(`reading the localStorate I got:${localStorage.getItem('book')}`);
      return JSON.parse(localStorage.getItem('book'));
    }
    return false;
  };
  const clearStorage = () => {
    localStorage.removeItem('book');
  };

  const saveBook = (book) => {
    // console.log(book.getProjects());
    const projectsInBook = book.getProjects();
    // translate item into jason
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
    console.log(`generating initialized book: ${JSON.stringify(bookProject)}`);
  };

  return {
    getObjectStorage,
    storeObject,
    clearStorage,
    saveBook,
  };
})();
export default Storage;