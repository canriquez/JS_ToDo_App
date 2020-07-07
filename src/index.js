import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


import { todoItem } from './components/todoitem';
import { todoProject } from './components/todoproject'
import todoBook from './components/todobook';


// navbar logo
import logo from './icons/logo.svg';
const logoIcon = new Image();
logoIcon.src = logo;
document.getElementById('brandLogo').appendChild(logoIcon);



const book = todoBook('user1');
book.initialize();

const p1 = todoProject('TODO APP');
const item1 = todoItem('Define Data model', 'Create excel with data model and methods', '7/07/2020', 'high');
const item2 = todoItem('Create basic Factories', 'Create factory files and methods', '8/07/2020', 'high');
const item3 = todoItem('Create screens wireframes', 'Create initial screen designs', '9/07/2020', 'high');

p1.addItem(item1);
p1.addItem(item2);
p1.addItem(item3);

book.addProject(p1);


/// Render projects

function renderProjects() {
    let htmlTag = ``;
    for (let i = 0; i < book.getProjects().length; i += 1) {
        htmlTag += `<div id="p${i}"><p class="project">${book.getProjects()[i].getName()}</p></div>`
    }
    document.getElementById('projects').innerHTML = htmlTag;
}

function renderItems(project) {
    let htmlTag = `    <div class="list-group">
    <div class="list-group-item list-group-item-action active">
      Today
    </div>`;

    let i = 0;
    for (let item of book.getSingleProject(project).getProjectItems()) {
        htmlTag += `<div clas="projectItem" id="item${i}"><p class="list-group-item list-group-item-action">${item.getTitle()}</p></div>`
        i += 1;
    }

    htmlTag += `</div>`

    document.getElementById('todoItems').innerHTML = htmlTag;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderItems(1);

});