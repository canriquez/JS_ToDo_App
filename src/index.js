import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
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
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(`BOOK IS THIS: ${book.getUser()}`);

  initializeBookStorage(); // Creates a new book or reads existing storage

  book.setDomSelectedProject(0); // sets project default as selected;
  DisplayController.renderNewItemForm();
  DisplayController.prepareProjects(book);

  // add listener to buttons
  DisplayController.addListenerProjectBtn(book);
  DisplayController.addListenerItemBtn(book);
});

export default book;