import { format } from 'date-fns';

const { default: todoProject } = require('./todoproject');
const { default: todoItem } = require('./todoitem');

export const DisplayController = (() => {
  const prepareProjectObject = () => {
    const name = document.getElementById('projectName').value;
    const project = todoProject(name, 0);
    document.getElementById('projectName').value = '';
    return project;
  };

  const prepareItemObject = () => {
    const parts = document.getElementById('inputDate').value.split('-');
    const date = new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
    const title = document.getElementById('inputTitle').value;
    const description = document.getElementById('inputDescription').value;
    const duedate = date;
    const priority = document.getElementById('inputPriority').value;
    const item = todoItem(title, description, duedate, priority);
    return item;
  };

  const readItemUpdateValue = (itemProperty) => {
    let property = document.getElementById(itemProperty).value;
    console.log(`reading value: ${itemProperty}`);
    if (itemProperty === 'inputEdit_dueDate') {
      console.log('parsing date');
      const parts = property.split('-');
      console.log(parts);
      property = new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
    }
    return property;
  };

  const selectDomProject = (project) => {
    console.log(`select dom ${project}`);
    const project_items = document.getElementsByClassName('projectItem');
    for (let i = 0; i < project_items.length; i += 1) {
      project_items[i].classList.remove('selectedProject');
    }
    console.log('domproj');
    const domProject = document.getElementById(`p${project}`);
    console.log('class');
    domProject.classList.add('selectedProject');
  };

  const clearItemProjectForm = () => {
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputPriority').value = 'low';
    document.getElementById('inputDate').value = '';
  };

  return {
    prepareProjectObject,
    prepareItemObject,
    selectDomProject,
    clearItemProjectForm,
    readItemUpdateValue,
  };
})();

export default DisplayController;