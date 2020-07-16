import { differenceInCalendarDays, format } from 'date-fns';
import { Storage } from './storage';

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
    if (itemProperty === 'inputEdit_dueDate') {
      const parts = property.split('-');
      property = new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
    }
    return property;
  };

  const selectDomProject = (project) => {
    const projectItems = document.getElementsByClassName('projectItem');
    for (let i = 0; i < projectItems.length; i += 1) {
      projectItems[i].classList.remove('selectedProject');
    }
    const domProject = document.getElementById(`p${project}`);
    domProject.classList.add('selectedProject');
  };

  const clearItemProjectForm = () => {
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputPriority').value = 'low';
    document.getElementById('inputDate').value = '';
  };

  /* General Render and Listener Management */

  // Render new project Item Form
  const renderNewItemForm = () => {
    const htmlTag = `<form id="addProject">
          <div class="form-row">
              <div class="form-group col-md-6">
                  <label for="inputTitle">Title</label>
                  <input type="text" class="form-control" id="inputTitle" placeholder="Title">
              </div>
              <div class="form-group col-md-3">
                  <label for="inputDate">Due date</label>
                  <input type="date" 
                  value="${format(new Date(), 'yyyy-MM-dd')}" 
                  class="form-control" id="inputDate">
              </div>
              <div class="form-group col-md-3">
                  <label for="inputPriority">Priority</label>
                  <select id="inputPriority" class="form-control">
                <option value="low" selected>Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>                      
              </select>
              </div>
          </div>
          <div class="form-group">
              <label for="inputDescription">Description</label>
              <input type="text" class="form-control" id="inputDescription" placeholder="Brief description">
          </div>
          <button type="button" id="btnAddItem" class="btn btn-success align-self-end">
              Add ToDo  
              <i class="glyphicon glyphicon-plus"></i>
          </button> 
          </form>`;
    document.getElementById('form-container').innerHTML = htmlTag;
  };


  // Render projects
  const renderProjects = (book) => {
    let htmlTag = '';
    for (let i = 0; i < book.getProjects().length; i += 1) {
      // counts the number of "open" intems in the project
      const iCount = book.getProjects()[i]
        .getItemDueGroupsCount()
        .reduce((sum, groupCount) => sum + groupCount);
      htmlTag += `<div class="card projectItem" data-index="${i}" id="p${i}">        
      <div class="card-body d-flex flex-row justify-content-between align-items-center">
          <p class="project-count" id="projectCounter${i}">${iCount > 0 ? `(${iCount})` : ''}</p>
          <p class="editProjectName" data-index="${i}" project m-0">${book.getProjects()[i].getName()}</p>
          <div class="action-icons d-flex flex-row justify-content-around align-items-center">
              <span id="remove${i}" class="glyphicon glyphicon-remove action-remove-project" data-index=${i}></span>
          </div>
      </div>
      </div>`;
    }
    document.getElementById('projectItems').innerHTML = htmlTag;
  };

  const prioStyle = (prio) => {
    if (prio === 'high') {
      return 'badge badge-pill badge-danger';
    }
    if (prio === 'medium') {
      return 'badge badge-pill badge-warning';
    }
    return 'badge badge-pill badge-primary';
  };

  // This method must recieve the current selected project object
  const renderItems = (projectObj) => {
    let htmlTagToday = '';
    let htmlTagTomorrow = '';
    let htmlTagLater = '';
    const dueGroups = projectObj.getItemDueGroupsCount();

    let i = 0;
    projectObj.getProjectItems().forEach(item => {
      const result = differenceInCalendarDays(item.getDueDate(), new Date());
      if (result === 0) {
        htmlTagToday += `<div class="card projectItem" id="item${i}">
          <div id="box-item-${i}" class="card-body d-flex flex-row justify-content-between align-items-center pt-4 ${item.getStatus() === 'complete' ? 'complete-item' : ''}">
          <div id="update-${i}" data-index="${i}" class="complete-check">  <span class="glyphicon glyphicon-check"></span> </div>
          <div class="item-info">
              <h3 class="editItem" data-index="${i}" data-element="title">${item.getTitle()}</h3>
              <p class="editItem" data-index="${i}" data-element="description">${item.getDescription()}</p>
          </div>
          <div class="due-box  d-flex flex-row justify-content-around align-items-center">
              <h5 class="m-0">Due date:</h5>
              <p class="m-0 editItem" data-index="${i}" placeholder="dd-mm-yyyy" data-element="dueDate">${item.getHtmlSafeDueDate()}</p>
          </div>
          <div class="item-status">
              <p class="m-0">${(result < 0 ? ' Overdue' : ' Upcoming')}</p>
          </div>
          <div class="priority ${prioStyle(item.getPriority())}">
              <p class="m-0 editItem" data-index="${i}" data-element="priority">${item.getPriority()}</p>
          </div>
          <div class="action-icons remove-item d-flex flex-row justify-content-around align-items-center">
              <span id="remove${i}" class="glyphicon glyphicon-remove action-remove-item" data-index=${i}></span>
          </div>
      </div>
          </div>`;
      } else if (result === 1) {
        htmlTagTomorrow += `<div class="card projectItem" id="item${i}">
          <div id="box-item-${i}" class="card-body d-flex flex-row justify-content-between align-items-center pt-4 ${item.getStatus() === 'complete' ? 'complete-item' : ''}">
          <div id="update-${i}" data-index="${i}" class="complete-check">  <span class="glyphicon glyphicon-check"></span> </div>
              <div class="item-info">
                  <h3 class="editItem" data-index="${i}" data-element="title">${item.getTitle()}</h3>
                  <p class="editItem" data-index="${i}" data-element="description">${item.getDescription()}</p>
              </div>
              <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                  <h5 class="m-0">Due date:</h5>
                  <p class="m-0 editItem" data-index="${i}" placeholder="dd-mm-yyyy" data-element="dueDate">${item.getHtmlSafeDueDate()}</p>
              </div>
              <div class="item-status">
                  <p class="m-0">${(result < 0 ? ' Overdue' : ' Upcoming')}</p>
              </div>
              <div class="priority ${prioStyle(item.getPriority())}">
                  <p class="m-0 editItem" data-index="${i}" data-element="priority">${item.getPriority()}</p>
              </div>
              <div class="action-icons remove-item d-flex flex-row justify-content-around align-items-center">
                  <span id="remove${i}" class="glyphicon glyphicon-remove action-remove-item" data-index=${i}></span>
              </div>
          </div>
      </div>`;
      } else {
        htmlTagLater += `<div class="card projectItem" id="item${i}">
          <div id="box-item-${i}" class="card-body d-flex flex-row justify-content-between align-items-center pt-4 ${item.getStatus() === 'complete' ? 'complete-item' : ''}">
          <div id="update-${i}" data-index="${i}" class="complete-check">  <span class="glyphicon glyphicon-check"></span> </div>
              <div class="item-info">
                  <h3 class="editItem" data-index="${i}" data-element="title">${item.getTitle()}</h3>
                  <p class="editItem" data-index="${i}" data-element="description">${item.getDescription()}</p>
              </div>
              <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                  <h5 class="m-0">Due date:</h5>
                  <p class="m-0 editItem" data-index="${i}" placeholder="dd-mm-yyyy" data-element="dueDate">${item.getHtmlSafeDueDate()}</p>
              </div>
              <div class="item-status">
                  <p class="m-0">${(result < 0 ? ' Overdue' : ' Upcoming')}</p>
              </div>
              <div class="priority ${prioStyle(item.getPriority())}">
                  <p class="m-0 editItem" data-index="${i}" data-element="priority">${item.getPriority()}</p>
              </div>
              <div class="action-icons remove-item d-flex flex-row justify-content-around align-items-center">
                  <span id="remove${i}" class="glyphicon glyphicon-remove action-remove-item" data-index=${i}></span>
              </div>
          </div>
      </div>`;
      }
      i += 1;
    });

    document.getElementById('today-count').innerHTML = '';
    document.getElementById('tomorrow-count').innerHTML = '';
    document.getElementById('later-count').innerHTML = '';
    document.getElementById('today').innerHTML = htmlTagToday;
    document.getElementById('tomorrow').innerHTML = htmlTagTomorrow;
    document.getElementById('later').innerHTML = htmlTagLater;
    if (dueGroups[0] !== 0) { document.getElementById('today-count').innerHTML = `(${dueGroups[0]})`; }
    if (dueGroups[1] !== 0) { document.getElementById('tomorrow-count').innerHTML = `(${dueGroups[1]})`; }
    if (dueGroups[2] !== 0) { document.getElementById('later-count').innerHTML = `(${dueGroups[2]})`; }

    // updating project counter
    const counterProject = dueGroups.reduce((sum, groupCount) => sum + groupCount);
    document.getElementById(`projectCounter${projectObj.getProjectId()}`).innerHTML = '';
    if (counterProject !== 0) { document.getElementById(`projectCounter${projectObj.getProjectId()}`).innerHTML = `(${counterProject})`; }
  };

  const addCompleteItemListeners = (book) => {
    const updateItems = document.getElementsByClassName('complete-check');

    const toggleItem = function toggleItem() {
      const currentProject = book.getSingleProject(book.getDomSelectedProject());
      const itemIndex = this.getAttribute('data-index');
      const currentItem = currentProject.getProjectItems()[itemIndex];
      const itemStatus = currentItem.getStatus();

      if (itemStatus === 'open') {
        currentProject.getProjectItems()[itemIndex].completeItem();
        const domItemTag = document.getElementById(`box-item-${itemIndex}`);
        domItemTag.classList.add('complete-item');
      } else {
        currentProject.getProjectItems()[itemIndex].openItem();
        const domItemTag = document.getElementById(`box-item-${itemIndex}`);
        domItemTag.classList.remove('complete-item');
      }
      book.getDomSelectedProjectObject().clearEditing();
      renderItems(book.getDomSelectedProjectObject());
      addCompleteItemListeners(book);
      // eslint-disable-next-line no-use-before-define
      addItemActionListeners(book);
      Storage.saveBook(book);
    };


    for (let i = 0; i < updateItems.length; i += 1) {
      updateItems[i].addEventListener('click', toggleItem, false);
    }
  };

  const addItemActionListeners = (book) => {
    const itemsRemoveAction = document.getElementsByClassName('action-remove-item');
    const itemsTitleEditAction = document.getElementsByClassName('editItem');

    const removeItem = function removeItem() {
      const currentProject = book.getSingleProject(book.getDomSelectedProject());
      currentProject.removeItem(this.getAttribute('data-index'));
      book.getDomSelectedProjectObject().clearEditing();
      renderItems(book.getDomSelectedProjectObject());
      addCompleteItemListeners(book);
      addItemActionListeners(book);
      Storage.saveBook(book);
    };

    const addItemCancelListers = (book) => {
      const itemsCancelAction = document.getElementsByClassName('action-cancel-item');
      const cancelItem = function cancelItem(event) {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        currentProject.clearEditing();
        event.stopPropagation();
        // eslint-disable-next-line no-use-before-define
        prepareItems(book.getDomSelectedProjectObject());
        addCompleteItemListeners(book);
        addItemActionListeners(book);
      };
      for (let i = 0; i < itemsCancelAction.length; i += 1) {
        itemsCancelAction[i].addEventListener('click', cancelItem, false);
      }
    };

    const addItemUpdateListeners = (book) => {
      const itemsUpdateAction = document.getElementsByClassName('action-save-item');

      const saveItem = function saveItem(event) {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        const item = this.getAttribute('data-index');
        const element = this.getAttribute('data-element');

        const newValue = DisplayController.readItemUpdateValue(`inputEdit_${element}`);
        switch (element) {
          case 'title':
            currentProject.getProjectItems()[item].setTitle(newValue);
            break;
          case 'description':
            currentProject.getProjectItems()[item].setDescription(newValue);
            break;
          case 'dueDate':
            currentProject.getProjectItems()[item].setDueDate(newValue);
            break;
          case 'priority':
            currentProject.getProjectItems()[item].setPriority(newValue);
            break;
          default:
            break;
        }

        book.getDomSelectedProjectObject().clearEditing();
        renderItems(book.getDomSelectedProjectObject());
        addCompleteItemListeners(book);
        addItemActionListeners(book);
        Storage.saveBook(book);
        currentProject.clearEditing();
        event.stopPropagation();
      };

      for (let i = 0; i < itemsUpdateAction.length; i += 1) {
        itemsUpdateAction[i].addEventListener('click', saveItem, false);
      }
    };

    const editItem = function editItem(event) {
      const currentProject = book.getSingleProject(book.getDomSelectedProject());
      const item = this.getAttribute('data-index');
      const element = this.getAttribute('data-element');
      const itemObject = currentProject.getProjectItems()[item];
      const itemStatus = itemObject.getStatus();
      const updateIconsTag = document.getElementById(`update-${item}`);
      if (itemStatus === 'complete') { return; }
      if (currentProject.getEditing()) { return; }
      currentProject.setEditing();
      this.removeEventListener(event, editItem, true);
      // render inputs on the element's Item to edit
      this.classList.remove('editItem');
      const editDueDate = itemObject.getDueDate();
      switch (element) {
        case 'title':
        case 'description':
          this.innerHTML = `<input type="text" value="${this.innerHTML}"
              id="inputEdit_${element}"
              >
              <div>
              <span id="save${item}" class="glyphicon glyphicon-floppy-disk action-save-item" data-index="${item}" data-element="${element}"></span>
              <span id="cancell${item}" class="glyphicon glyphicon-remove action-cancel-item" data-index="${item}" data-element="${element}"></span>
              </div>`;
          break;
        case 'dueDate':
          this.innerHTML = `<input type="date" value="${format(editDueDate, 'yyyy-MM-dd')}"
              id="inputEdit_${element}"
              
              >
              <div>
              <span id="save${item}" class="glyphicon glyphicon-floppy-disk action-save-item" data-index="${item}" data-element="${element}"></span>
              <span id="cancell${item}" class="glyphicon glyphicon-remove action-cancel-item" data-index="${item}" data-element="${element}"></span>
              </div>`;
          break;
        case 'priority':
          this.innerHTML = `<select id="inputEdit_${element}">
                    <option value="low" 
                    ${itemObject.getPriority() === 'low' ? 'selected' : ''} 
                    >Low</option>
                    <option value="medium"
                    ${itemObject.getPriority() === 'medium' ? 'selected' : ''} 
                    >Medium</option>
                    <option value="high"
                    ${itemObject.getPriority() === 'high' ? 'selected' : ''} 
                    >High</option>                      
                  </select>
              `;
          updateIconsTag.innerHTML = `
              <div class = "updateItemIcons">
              <span id="save${item}" class="glyphicon glyphicon-floppy-disk action-save-item" data-index="${item}" data-element="${element}"></span>
              <span id="cancell${item}" class="glyphicon glyphicon-remove action-cancel-item" data-index="${item}" data-element="${element}"></span>
              </div>
              `;
          break;
        default:
          break;
      }

      addItemUpdateListeners(book);
      addItemCancelListers(book);
    };

    for (let i = 0; i < itemsRemoveAction.length; i += 1) {
      itemsRemoveAction[i].addEventListener('click', removeItem, false);
    }
    for (let i = 0; i < itemsTitleEditAction.length; i += 1) {
      itemsTitleEditAction[i].addEventListener('click', editItem, false);
    }
  };


  const prepareItems = (currentProject) => {
    currentProject.clearEditing();
    renderItems(currentProject); // move
  };

  const addProjectCancelListeners = (book) => {
    const cancelAction = document.getElementsByClassName('action-cancel-project');
    const cancelProject = function cancelProject(event) {
      book.clearEditing();
      event.stopPropagation();
      // eslint-disable-next-line no-use-before-define
      prepareProjects(book);
    };
    for (let i = 0; i < cancelAction.length; i += 1) {
      cancelAction[i].addEventListener('click', cancelProject, false);
    }
  };

  const addProjectUpdateListeners = (book) => {
    const updateAction = document.getElementsByClassName('action-save-project');
    const saveProject = function saveProject(event) {
      const currentProject = book.getSingleProject(book.getDomSelectedProject());
      const value = DisplayController.readItemUpdateValue('inputEditProject');
      currentProject.setName(value);
      book.clearEditing();
      event.stopPropagation();
      // eslint-disable-next-line no-use-before-define
      prepareProjects(book);
    };

    for (let i = 0; i < updateAction.length; i += 1) {
      updateAction[i].addEventListener('click', saveProject, false);
    }
  };

  const addProjectEditListeners = (book) => {
    const projectsTitleEditAction = document.getElementsByClassName('editProjectName');


    const editProjectName = function editProjectName(event) {
      if (book.getEditing()) { return; }

      const projectNameToEdit = this.getAttribute('data-index');
      book.setDomSelectedProject(this.getAttribute('data-index'));
      selectDomProject(this.getAttribute('data-index'));
      book.getDomSelectedProjectObject().clearEditing();
      renderItems(book.getDomSelectedProjectObject());
      addCompleteItemListeners(book);
      addItemActionListeners(book);
      Storage.saveBook(book);

      const selecteProject = book.getDomSelectedProject();
      event.stopPropagation();
      if (projectNameToEdit === selecteProject) {
        book.setEditing();
        this.innerHTML = `<input type="text" value="${this.innerHTML}"
              id="inputEditProject"
              >
              <div>
              <span class="glyphicon glyphicon-floppy-disk action-save-project"></span>
              <span class="glyphicon glyphicon-remove action-cancel-project"></span>
              </div>`;
      } else {
        return;
      }

      addProjectCancelListeners(book); // move
      addProjectUpdateListeners(book); // move
    };

    for (let i = 0; i < projectsTitleEditAction.length; i += 1) {
      projectsTitleEditAction[i].addEventListener('click', editProjectName, false);
    }
  };

  const addProjectActionListeners = (book) => {
    const projects = document.getElementsByClassName('action-remove-project');

    const removeProject = function removeProject(event) {
      if (book.getEditing()) { return; }
      book.removeProject(this.getAttribute('data-index'));
      book.setDomSelectedProject(0);
      // eslint-disable-next-line no-use-before-define
      Storage.clearStorage();
      Storage.saveBook(book);
      book.clearProjects();
      book.convertJSONtoProjects(Storage.getObjectStorage());
      // eslint-disable-next-line no-use-before-define
      prepareProjects(book);
      event.stopPropagation();
    };
    for (let i = 0; i < projects.length; i += 1) {
      projects[i].addEventListener('click', removeProject, false);
    }
  };

  const addListenersToProjects = (book) => {
    // add listener to projects
    const projectItems = document.getElementsByClassName('projectItem');
    const showListProjects = function showListProjects() {
      if (book.getEditing()) { return; }
      book.setDomSelectedProject(this.getAttribute('data-index'));
      selectDomProject(this.getAttribute('data-index'));
      // eslint-disable-next-line no-use-before-define
      prepareItems(book.getDomSelectedProjectObject());
      addCompleteItemListeners(book);
      addItemActionListeners(book);
    };
    for (let i = 0; i < projectItems.length; i += 1) {
      projectItems[i].addEventListener('click', showListProjects, false);
    }
  };

  const prepareProjects = (book) => {
    renderProjects(book);
    selectDomProject(book.getDomSelectedProject());
    addListenersToProjects(book);
    addProjectActionListeners(book);
    addProjectEditListeners(book);
    prepareItems(book.getDomSelectedProjectObject());
    Storage.saveBook(book);
    addCompleteItemListeners(book);
    addItemActionListeners(book);
  };


  const addListenerItemBtn = (book) => {
    document.getElementById('btnAddItem').addEventListener('click', () => {
      const domItem = prepareItemObject();

      if (book.getDomSelectedProject() === -1) {
        return;
      }
      const currentProject = book.getSingleProject(book.getDomSelectedProject());
      if (domItem.getTitle() === '' || currentProject.itemExists(domItem) || domItem.isOverdue()) {
        return;
      }
      currentProject.addItem(domItem);
      renderNewItemForm();
      addListenerItemBtn(book);
      // eslint-disable-next-line no-use-before-define
      prepareProjects(book);
    });
  };

  const addListenerProjectBtn = (book) => {
    document.getElementById('btnAddProject').addEventListener('click', () => {
      let p = prepareProjectObject();
      if (book.getEditing()) { return; }
      if (p.getName() === '' || book.projectExists(p)) {
        return;
      }
      p = book.addProject(p.getName());
      Storage.storeObject(book);
      book.setDomSelectedProject(p.getProjectId());
      // eslint-disable-next-line no-use-before-define
      prepareProjects(book);
    });
  };

  return {
    prepareProjectObject,
    prepareItemObject,
    selectDomProject,
    clearItemProjectForm,
    readItemUpdateValue,
    renderItems,
    addItemActionListeners,
    addCompleteItemListeners,
    renderProjects,
    addListenersToProjects,
    addProjectActionListeners,
    addProjectEditListeners,
    prepareProjects,
    prepareItems,
    renderNewItemForm,
    addListenerItemBtn,
    addListenerProjectBtn,
  };
})();

export default DisplayController;