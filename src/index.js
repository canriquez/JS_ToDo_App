import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { todoBook } from './components/todobook';
import { DisplayController } from './components/displaycontroller';
import { Storage } from './components/storage';
import logo from './icons/logo.svg';

require('webpack-icons-installer');

const logoIcon = new Image();
logoIcon.src = logo;
document.getElementById('brandLogo').appendChild(logoIcon);
const book = todoBook('user1');

function initializeBookStorage() {
  if (Storage.getObjectStorage()) {
    book.convertJSONtoProjects(Storage.getObjectStorage());
  } else {
    book.initialize();
    Storage.saveBook(book);
  }
}

function initApp() {
  initializeBookStorage(); // Creates a new book or reads existing storage
  book.setDomSelectedProject(0); // sets project default as selected;
  DisplayController.renderNewItemForm();
  DisplayController.prepareProjects(book);
  DisplayController.addListenerProjectBtn(book);
  DisplayController.addListenerItemBtn(book);
}

function clear() {
  Storage.clearStorage();
  book.clearProjects();
  initApp();
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  document.getElementById('btnClearStorage').addEventListener('click', () => {
    clear();
  });
});

export default book;