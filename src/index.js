import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { todoItem } from './components/todoitem';
import { todoBook } from './components/todobook';
import { DisplayController } from './components/displaycontroller';
import { Storage } from './components/storage';

// navbar logo
import logo from './icons/logo.svg';

require('webpack-icons-installer');

//Storage.clearStorage();

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

document.addEventListener('DOMContentLoaded', () => {

    console.log("BOOK IS THIS: " + book.getUser())

    initializeBookStorage(); // Creates a new book or reads existing storage

    book.setDomSelectedProject(0); // sets project default as selected;
    DisplayController.renderNewItemForm();
    DisplayController.prepareProjects(book);

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
        DisplayController.prepareProjects(book);
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
        DisplayController.renderNewItemForm();
        DisplayController.prepareProjects(book);
    });
});

export default book;