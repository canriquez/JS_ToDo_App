import { Storage } from './storage';

const book = todoBook('user1');
import { todoItem } from './todoitem';
import { todoBook } from './todobook';


const loadDummyProjects = () => {
    const p1 = book.addProject('TODO APP');
    const item1 = todoItem('Define Data model', 'Create excel with data model and methods', new Date(), 'high');
    const item2 = todoItem('Create basic Factories', 'Create factory files and methods', new Date(), 'high');

    p1.addItem(item1);
    p1.addItem(item2); // Item added into the project's array with the project Id Set.

    console.log('our projects: ');
    console.log(book.getProjects());
}


const initializeBookStorage = () => {
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


export default { book, loadDummyProjects, initializeBookStorage }