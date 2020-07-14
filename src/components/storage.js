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
    const projects_in_book = book.getProjects();
    // translate item into jason
    const book_project = {};
    let array_of_items_in_project = [];
    let item;

    const array_projects_to_save = [];

    for (let i = 0; i < projects_in_book.length; i += 1) {
      array_of_items_in_project = projects_in_book[i].getProjectItems();
      const project_object = {};
      project_object.name = projects_in_book[i].getName();
      project_object.projectId = projects_in_book[i].getProjectId();

      const array_items_to_save = [];
      for (let j = 0; j < array_of_items_in_project.length; j += 1) {
        const json_item = {};
        item = array_of_items_in_project[j];
        json_item.title = item.getTitle();
        json_item.description = item.getDescription();
        json_item.dueDate = item.getDueDate();
        json_item.priority = item.getPriority();
        json_item.status = item.getStatus();
        json_item.projectId = item.getProjectId();
        array_items_to_save.push(json_item);
      }
      project_object.items = array_items_to_save;
      array_projects_to_save.push(project_object);
    }

    book_project.projects = array_projects_to_save;
    storeObject(book_project);
    console.log(`generating initialized book: ${JSON.stringify(book_project)}`);
  };

  return {
    getObjectStorage,
    storeObject,
    clearStorage,
    saveBook,
  };
})();
export default Storage;