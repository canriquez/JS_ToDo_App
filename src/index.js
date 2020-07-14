import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { differenceInCalendarDays, format } from 'date-fns';

import { todoItem } from './components/todoitem';
import { todoBook } from './components/todobook';
import { DisplayController } from './components/displaycontroller';
import { Storage } from './components/storage';

// navbar logo
import logo from './icons/logo.svg';

require('webpack-icons-installer');

// Storage.clearStorage();

const logoIcon = new Image();
logoIcon.src = logo;
document.getElementById('brandLogo').appendChild(logoIcon);
const book = todoBook('user1');


function loadDummyProjects() {
    const p1 = book.addProject('TODO APP');
    const item1 = todoItem('Define Data model', 'Create excel with data model and methods', new Date(), 'high');
    const item2 = todoItem('Create basic Factories', 'Create factory files and methods', new Date(), 'high');

    p1.addItem(item1);
    p1.addItem(item2); // Item added into the project's array with the project Id Set.

    console.log('our projects: ');
    console.log(book.getProjects());
}


function initializeBookStorage() {
    // / Book Storage Metod
    if (Storage.getObjectStorage()) {
        console.log('localStorage object present... reading now..');
        book.convertJSONtoProjects(Storage.getObjectStorage());
    } else {
        console.log('localStorage object not present.. generating empty book');
        book.initialize();
        Storage.saveBook(book);
    }

    console.log(`After reading local storage book : ${book.getSingleProject(0).getName()}`);
    loadDummyProjects();
}

// Render projects
//move
function renderProjects() {
    let htmlTag = '';
    for (let i = 0; i < book.getProjects().length; i += 1) {
        htmlTag += `<div class="card projectItem" data-index="${i}" id="p${i}">        
        <div class="card-body d-flex flex-row justify-content-between align-items-center">
            <p class="editProjectName" data-index="${i}" project m-0">${book.getProjects()[i].getName()}</p>
            <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                <span id="remove${i}" class="glyphicon glyphicon-remove action-remove-project" data-index=${i}></span>
            </div>
        </div>
        </div>`;
    }
    document.getElementById('projectItems').innerHTML = htmlTag;
}

//move
function prioStyle(prio) {
    console.log(`prios :${prio}`);
    if (prio === 'high') {
        return 'badge badge-pill badge-danger';
    }
    if (prio === 'medium') {
        return 'badge badge-pill badge-warning';
    }
    return 'badge badge-pill badge-primary';
}

//move
function renderItems(project) {
    let htmlTagToday = '';
    let htmlTagTomorrow = '';
    let htmlTagLater = '';

    let i = 0;
    book.getSingleProject(project).getProjectItems().forEach(item => {
        console.log('rendering items in the today/tomorrow groups');
        console.log(item.getDueDate());

        // const date = Date.parse(item.getDueDate());
        // const todayDate = new Date();
        console.log(`today is: ${format(new Date(), 'dd/MM/yyy')} - Item date is :${format(item.getDueDate(), 'dd/MM/yyy')}`);

        const result = differenceInCalendarDays(item.getDueDate(), new Date());
        console.log(`item :${item.getTitle()} due day in: ${result} days.`);
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

    document.getElementById('today').innerHTML = htmlTagToday;
    document.getElementById('tomorrow').innerHTML = htmlTagTomorrow;
    document.getElementById('later').innerHTML = htmlTagLater;
}

//move
function addListenersToProjects() {
    // add listener to projects
    const projectItems = document.getElementsByClassName('projectItem');
    const showListProjects = function showListProjects() {
        if (book.getEditing()) { return; }
        console.log(`click on select project : ${this.getAttribute('data-index')}`);
        book.setDomSelectedProject(this.getAttribute('data-index'));
        DisplayController.selectDomProject(this.getAttribute('data-index'));
        // eslint-disable-next-line no-use-before-define
        prepareItems();
    };
    for (let i = 0; i < projectItems.length; i += 1) {
        projectItems[i].addEventListener('click', showListProjects, false);
    }
}

//move
function addItemCancelListers() {
    const itemsCancelAction = document.getElementsByClassName('action-cancel-item');
    const cancelItem = function cancelItem(event) {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        currentProject.clearEditing();
        event.stopPropagation();
        // eslint-disable-next-line no-use-before-define
        prepareItems();
    };
    for (let i = 0; i < itemsCancelAction.length; i += 1) {
        itemsCancelAction[i].addEventListener('click', cancelItem, false);
    }
}

//move
function addItemUpdateListeners() {
    const itemsUpdateAction = document.getElementsByClassName('action-save-item');

    const saveItem = function saveItem(event) {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        const item = this.getAttribute('data-index');
        const element = this.getAttribute('data-element');

        const newValue = DisplayController.readItemUpdateValue(`inputEdit_${element}`);
        console.log(`saving: ${element}`);
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

        // eslint-disable-next-line no-use-before-define
        prepareItems();
        console.log('now trying to clear editing flag');
        currentProject.clearEditing();
        console.log(`Just finished editing. editing item? : ${currentProject.getEditing()}`);
        event.stopPropagation();
        console.log(`...and event propagation halted after editing Title ${this.getAttribute('data-index')}`);
    };

    for (let i = 0; i < itemsUpdateAction.length; i += 1) {
        itemsUpdateAction[i].addEventListener('click', saveItem, false);
    }
}

//move
function addProjectCancelListeners() {
    const cancelAction = document.getElementsByClassName('action-cancel-project');
    const cancelProject = function cancelProject(event) {
        book.clearEditing();
        event.stopPropagation();
        // eslint-disable-next-line no-use-before-define
        prepareProjects();
    };
    for (let i = 0; i < cancelAction.length; i += 1) {
        cancelAction[i].addEventListener('click', cancelProject, false);
    }
}

//move
function addProjectUpdateListeners() {
    const updateAction = document.getElementsByClassName('action-save-project');

    const saveProject = function saveProject(event) {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        const value = DisplayController.readItemUpdateValue('inputEditProject');
        console.log(`new project name: ${value}`);
        console.log(currentProject);
        currentProject.setName(value);

        book.clearEditing();
        console.log(`is Editing?: ${book.getEditing()}`);
        console.log(`Just finished editing project title. editing project? : ${book.getEditing()}`);
        event.stopPropagation();
        console.log(`...and event propagation halted after editing Title ${currentProject.getName()}`);
        // eslint-disable-next-line no-use-before-define
        prepareProjects();
    };

    for (let i = 0; i < updateAction.length; i += 1) {
        updateAction[i].addEventListener('click', saveProject, false);
    }
}

//move
function addProjectEditListeners() {
    const projectsTitleEditAction = document.getElementsByClassName('editProjectName');


    const editProjectName = function editProjectName(event) {
        console.log(`checking before return Editing?: ${book.getEditing()}`);
        if (book.getEditing()) { return; }

        console.log('click on editProjectName');
        const projectNameToEdit = this.getAttribute('data-index');

        console.log(`Changing selected project to ptoject: : ${projectNameToEdit}`);
        book.setDomSelectedProject(this.getAttribute('data-index'));
        DisplayController.selectDomProject(this.getAttribute('data-index'));
        // eslint-disable-next-line no-use-before-define
        prepareItems();

        const selecteProject = book.getDomSelectedProject();

        console.log(`project name edit Clicked: ${this.getAttribute('data-index')}`);
        console.log(`Now, selected Project is project: ${selecteProject}`);

        event.stopPropagation();
        console.log(`Killing propagation after selecting project: ${selecteProject}`);

        if (projectNameToEdit === selecteProject) {
            console.log('Lets Edit the Project name');
            book.setEditing();
            console.log(`is Editing?: ${book.getEditing()}`);
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

        addProjectCancelListeners(); //move
        addProjectUpdateListeners(); //move
    };

    for (let i = 0; i < projectsTitleEditAction.length; i += 1) {
        projectsTitleEditAction[i].addEventListener('click', editProjectName, false);
    }
}

//move
function addItemActionListeners() {
    const itemsRemoveAction = document.getElementsByClassName('action-remove-item');
    const itemsTitleEditAction = document.getElementsByClassName('editItem');

    const removeItem = function removeItem() {
        console.log('click on removeItem');
        console.log(this.getAttribute('data-index'));
        console.log(`click Item remove - project : ${book.getDomSelectedProject()} - item :${this.getAttribute('data-index')}`);
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        currentProject.removeItem(this.getAttribute('data-index'));
        // eslint-disable-next-line no-use-before-define
        prepareItems();
    };

    const editItem = function editItem(event) {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        const item = this.getAttribute('data-index');

        const element = this.getAttribute('data-element');
        const itemObject = currentProject.getProjectItems()[item];
        const itemStatus = itemObject.getStatus();
        console.log(`THIS IS THE STATUS OF THE ITEM CLICKED TO EDIT  :${itemStatus}`);


        const updateIconsTag = document.getElementById(`update-${item}`);

        if (itemStatus === 'complete') { return; }
        if (currentProject.getEditing()) { return; }


        currentProject.setEditing();

        this.removeEventListener(event, editItem, true);
        // render inputs on the element's Item to edit
        this.classList.remove('editItem');

        console.log(`editing: ${element}`);
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
                console.log('dueDate Case: Objects are - ');
                console.log(itemObject.getDueDate());
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

        addItemUpdateListeners(); //move
        addItemCancelListers(); //move

        // render accept icon to add changes
        // read new form imputs
        // save modified item in the project
        // re-render items
    };

    for (let i = 0; i < itemsRemoveAction.length; i += 1) {
        itemsRemoveAction[i].addEventListener('click', removeItem, false);
    }
    for (let i = 0; i < itemsTitleEditAction.length; i += 1) {
        itemsTitleEditAction[i].addEventListener('click', editItem, false);
    }
}
//move
function addProjectActionListeners() {
    const projects = document.getElementsByClassName('action-remove-project');
    const removeProject = function removeProject(event) {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        console.log("current selected project :" + currentProject.getName())
        console.log("Is someone editing anything? :" + book.getEditing())
        if (book.getEditing()) { return; }
        console.log(`click project remove - project : ${this.getAttribute('data-index')}`);
        book.removeProject(this.getAttribute('data-index'));
        book.setDomSelectedProject(0);
        // eslint-disable-next-line no-use-before-define
        Storage.clearStorage();
        Storage.saveBook(book);
        book.clearProjects();
        book.convertJSONtoProjects(Storage.getObjectStorage());
        prepareProjects();
        event.stopPropagation();
        console.log(`...and event propagation halted after killing project ${this.getAttribute('data-index')}`);
    };
    for (let i = 0; i < projects.length; i += 1) {
        projects[i].addEventListener('click', removeProject, false);
    }
}
//move
function addCompleteItemListeners() {
    const updateItems = document.getElementsByClassName('complete-check');

    const toggleItem = function toggleItem() {
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        console.log(`click toggle item : ${this.getAttribute('data-index')}`);
        const itemIndex = this.getAttribute('data-index');
        const currentItem = currentProject.getProjectItems()[itemIndex];
        const itemStatus = currentItem.getStatus();

        if (itemStatus === 'open') {
            console.log(`Item is:${itemStatus}`);
            currentProject.getProjectItems()[itemIndex].completeItem();
            const domItemTag = document.getElementById(`box-item-${itemIndex}`);
            domItemTag.classList.add('complete-item');
        } else {
            console.log(`Item is:${itemStatus}`);
            currentProject.getProjectItems()[itemIndex].openItem();
            const domItemTag = document.getElementById(`box-item-${itemIndex}`);
            domItemTag.classList.remove('complete-item');
        }
        console.log(`Now Item is:${currentItem.getStatus()}`);
        // eslint-disable-next-line no-use-before-define
        prepareItems();
    };


    for (let i = 0; i < updateItems.length; i += 1) {
        updateItems[i].addEventListener('click', toggleItem, false);
    }
}

function prepareItems() {
    const currentProject = book.getSingleProject(book.getDomSelectedProject());
    currentProject.clearEditing();
    renderItems(book.getDomSelectedProject()); //move
    addItemActionListeners(); //move
    addCompleteItemListeners(); //move
    Storage.saveBook(book);
}

function prepareProjects() {
    renderProjects(); //move
    DisplayController.selectDomProject(book.getDomSelectedProject());
    addListenersToProjects(); //move
    addProjectActionListeners(); //move
    addProjectEditListeners(); //move
    prepareItems();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeBookStorage(); // Creates a new book or reads existing storage

    book.setDomSelectedProject(0); // sets project default as selected;
    prepareProjects();

    // add listener to buttons
    document.getElementById('btnAddProject').addEventListener('click', () => {
        console.log("WARNING !: you click add project")
        let p = DisplayController.prepareProjectObject();
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        console.log("current selected project :" + currentProject.getName())
        console.log("Is someone editing anything? :" + book.getEditing())
        if (book.getEditing()) { return; }
        if (p.getName() === '' || book.projectExists(p)) {
            console.log('project name empty');
            return;
        }
        p = book.addProject(p.getName());
        Storage.storeObject(book);
        console.log('go to select project');
        console.log(p.getProjectId());
        book.setDomSelectedProject(p.getProjectId());
        console.log('selected project');
        prepareProjects();
    });

    document.getElementById('btnAddItem').addEventListener('click', () => {
        const domItem = DisplayController.prepareItemObject();

        if (book.getDomSelectedProject() === -1) {
            console.log('no project selected');
            return;
        }
        const currentProject = book.getSingleProject(book.getDomSelectedProject());
        if (domItem.getTitle() === '' || currentProject.itemExists(domItem) || domItem.isOverdue()) {
            console.log('item title empty');
            return;
        }
        currentProject.addItem(domItem);
        DisplayController.clearItemProjectForm();
        prepareItems();
    });
});