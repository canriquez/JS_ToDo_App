require('webpack-icons-installer');
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { differenceInCalendarDays, format } from 'date-fns'

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
const item1 = todoItem('Define Data model', 'Create excel with data model and methods', '2020-07-07', 'high');
const item2 = todoItem('Create basic Factories', 'Create factory files and methods', '2020-07-08', 'high');
const item3 = todoItem('Create screens wireframes', 'Create initial screen designs', '2020-07-09', 'high');

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
    let htmlTagToday = ``;
    let htmlTagTomorrow = ``;
    let htmlTagLater = ``;

    let i = 0;
    for (let item of book.getSingleProject(project).getProjectItems()) {

        let date = Date.parse(item.getDueDate());
        let todayDate = new Date();

        let result = differenceInCalendarDays(date, todayDate);

        if (result == 0) {
            htmlTagToday += `<div clas="projectItem" id="item${i}">
                <div class="list-group-item list-group-item-action">
                <h3>${item.getTitle()}</h3>
                <p>${item.getDescription()}</p>
                    <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                    <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
                </div>
            </div>`
        } else if (result == 1) {
            htmlTagTomorrow += `<div clas="projectItem" id="item${i}">
            <div class="list-group-item list-group-item-action">
            <h3>${item.getTitle()}</h3>
            <p>${item.getDescription()}</p>
                <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
            </div>
        </div>`
        } else {
            htmlTagLater += `<div clas="projectItem" id="item${i}">
            <div class="list-group-item list-group-item-action">
            <h3>${item.getTitle() + (result < 0? " - Overdue":" - Upcoming")}</h3>
            <p>${item.getDescription()}</p>
                <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
            </div>
        </div>`
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