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
    const item2 = todoItem('Create basic Factories', 'Create factory files and methods', new Date("2020/07/16"), 'high');
    const item3 = todoItem('Create basic Factories', 'Create factory files and methods', new Date("2020/07/17"), 'high');
    p1.addItem(item1);
    p1.addItem(item1);
    p1.addItem(item1);
    p1.addItem(item1);
    p1.addItem(item1);
    p1.addItem(item1);
    p1.addItem(item1);
    p1.addItem(item2); // Item added into the project's array with the project Id Set.
    p1.addItem(item2);
    p1.addItem(item2);
    p1.addItem(item2);
    p1.addItem(item2);
    p1.addItem(item2);
    p1.addItem(item2);
    p1.addItem(item3);
    p1.addItem(item3);
    p1.addItem(item3);
    p1.addItem(item3);
    p1.addItem(item3);
    p1.addItem(item3);
    p1.addItem(item3);
    p1.addItem(item3);
    p1.addItem(item3);

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
    //loadDummyProjects();
}

document.addEventListener('DOMContentLoaded', () => {

    console.log("BOOK IS THIS: " + book.getUser())

    initializeBookStorage(); // Creates a new book or reads existing storage

    book.setDomSelectedProject(0); // sets project default as selected;
    DisplayController.renderNewItemForm();
    DisplayController.prepareProjects(book);

    // add listener to buttons
    DisplayController.addListenerProjectBtn(book);
    DisplayController.addListenerItemBtn(book);

});

export default book;