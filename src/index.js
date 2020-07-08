import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { differenceInCalendarDays } from 'date-fns';

import { todoItem } from './components/todoitem';
import { todoBook } from './components/todobook';

// navbar logo
import logo from './icons/logo.svg';

require('webpack-icons-installer');

const logoIcon = new Image();
logoIcon.src = logo;
document.getElementById('brandLogo').appendChild(logoIcon);

// Create new project book for user1
const book = todoBook('user1');
book.initialize(); // Creates a new project "default" with id=0;

// const p1 = todoProject('TODO APP');
const p1 = book.addProject('TODO APP'); // Creat a project with ID '1'

const item1 = todoItem('Define Data model', 'Create excel with data model and methods', '2020-07-07', 'high');
const item2 = todoItem('Create basic Factories', 'Create factory files and methods', '2020-07-08', 'high');
const item3 = todoItem('Create screens wireframes', 'Create initial screen designs', '2020-07-09', 'high');

p1.addItem(item1); // Item added into the project's array with the project Id Set.
p1.addItem(item2);// Item added into the project's array with the project Id Set.
p1.addItem(item3);// Item added into the project's array with the project Id Set.

// book.addProject(p1);
console.log(`project Name: ${p1.getName()}, project Id: ${p1.getProjectId()}`);
console.log(`project Name: ${p1.getName()}Item 0's project: ${p1.getProjectItems()[1].getProjectId()}`);
console.log(`name :${book.getProjects()[0].getName()}`);
console.log(`id :${book.getProjects()[0].getProjectId()}`);
// / Render projects

function renderProjects() {
  let htmlTag = '';
  for (let i = 0; i < book.getProjects().length; i += 1) {
    htmlTag += `<div id="p${i}"><p class="project">${book.getProjects()[i].getName()}</p></div>`;
  }
  document.getElementById('projects').innerHTML = htmlTag;
}

function renderItems(project) {
  let htmlTagToday = '';
  let htmlTagTomorrow = '';
  let htmlTagLater = '';

  let i = 0;
  for (const item of book.getSingleProject(project).getProjectItems()) {
    const date = Date.parse(item.getDueDate());
    const todayDate = new Date();

    const result = differenceInCalendarDays(date, todayDate);

    if (result == 0) {
      htmlTagToday += `<div class="card projectItem" id="item${i}">
                <div class="card-body d-flex flex-row justify-content-between align-items-center">
                    <div class="item-info">
                        <h3>${item.getTitle()}</h3>
                        <p>${item.getDescription()}</p>
                    </div>
                    <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                        <h5 class="m-0">Due date:</h5>
                        <p class="m-0">${item.getDueDate()}</p>
                    </div>
                    <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                        <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                        <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
                    </div>
                </div>
            </div>`;
    } else if (result == 1) {
      htmlTagTomorrow += `<div class="card projectItem" id="item${i}">
            <div class="card-body d-flex flex-row justify-content-between align-items-center">
                <div class="item-info">
                    <h3>${item.getTitle()}</h3>
                    <p>${item.getDescription()}</p>
                </div>
                <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                    <h5 class="m-0">Due date:</h5>
                    <p class="m-0">${item.getDueDate()}</p>
                </div>
                <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                    <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                    <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
                </div>
            </div>
        </div>`;
    } else {
      htmlTagLater += `<div class="card projectItem" id="item${i}">
            <div class="card-body d-flex flex-row justify-content-between align-items-center">
                <div class="item-info">
                    <h3>${item.getTitle()}</h3>
                    <p>${item.getDescription()}</p>
                </div>
                <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                    <h5 class="m-0">Due date:</h5>
                    <p class="m-0">${item.getDueDate()}</p>
                </div>
                <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                    <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                    <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
                </div>
            </div>
        </div>`;
    }
    i += 1;
  }

  document.getElementById('today').innerHTML = htmlTagToday;
  document.getElementById('tomorrow').innerHTML = htmlTagTomorrow;
  document.getElementById('later').innerHTML = htmlTagLater;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderItems(1);
});