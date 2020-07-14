import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { book, initializeBookStorage } from './components/applogic.js';


import { DisplayController } from './components/displaycontroller';
import { Storage } from './components/storage';

// navbar logo
import logo from './icons/logo.svg';

require('webpack-icons-installer');

// Storage.clearStorage();

const logoIcon = new Image();
logoIcon.src = logo;
document.getElementById('brandLogo').appendChild(logoIcon);



document.addEventListener('DOMContentLoaded', () => {
    initializeBookStorage(); // Creates a new book or reads existing storage

    console.log("BOOK IS THIS: " + book.getUserName())
    book.setDomSelectedProject(0); // sets project default as selected;
    DisplayController.prepareProjects();

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

export default book;