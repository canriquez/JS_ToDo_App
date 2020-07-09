import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { differenceInCalendarDays, format } from 'date-fns';

import { todoItem } from './components/todoitem';
import { todoBook } from './components/todobook';
import { DisplayController } from './components/displaycontroller';

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

const item1 = todoItem('Define Data model', 'Create excel with data model and methods', '2020-07-08', 'high');
const item2 = todoItem('Create basic Factories', 'Create factory files and methods', '2020-07-09', 'high');
const item3 = todoItem('Create screens wireframes', 'Create initial screen designs', '2020-07-19', 'high');

p1.addItem(item1); // Item added into the project's array with the project Id Set.
p1.addItem(item2); // Item added into the project's array with the project Id Set.
p1.addItem(item3); // Item added into the project's array with the project Id Set.

// book.addProject(p1);
console.log(`project Name: ${p1.getName()}, project Id: ${p1.getProjectId()}`);
console.log(`project Name: ${p1.getName()}Item 0's project: ${p1.getProjectItems()[1].getProjectId()}`);
console.log(`name :${book.getProjects()[0].getName()}`);
console.log(`id :${book.getProjects()[0].getProjectId()}`);
// / Render projects

function renderProjects() {
    let htmlTag = '';
    for (let i = 0; i < book.getProjects().length; i += 1) {
        htmlTag += `<div class="card projectItem" data-index="${i}" id="p${i}">
        
        <div class="card-body d-flex flex-row justify-content-between align-items-center">
            <p class="project m-0">${book.getProjects()[i].getName()}</p>
            <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
            </div>
        </div>
        </div>`;
    }
    document.getElementById('projectItems').innerHTML = htmlTag;
}

function prioStyle(prio) {
    console.log('prios :' + prio)
    if (prio === 'high') {
        return 'badge badge-pill badge-danger';
    } else if (prio === 'medium') {
        return 'badge badge-pill badge-warning';
    } else {
        return 'badge badge-pill badge-primary';
    };
}

function renderItems(project) {
    let htmlTagToday = '';
    let htmlTagTomorrow = '';
    let htmlTagLater = '';

    let i = 0;
    book.getSingleProject(project).getProjectItems().forEach(item => {
        const date = Date.parse(item.getDueDate());
        const todayDate = new Date();
        console.log('today is: ' + format(todayDate, "dd/MM/yyy") + " - Item date is :" + format(date, "dd/MM/yyy"));

        const result = differenceInCalendarDays(date, todayDate);
        console.log("item :" + item.getTitle() + " due day in: " + result + " days.");
        if (result === 0) {
            htmlTagToday += `<div class="card projectItem" id="item${i}">
                <div class="card-body d-flex flex-row justify-content-between align-items-center pt-4">
                    <div class="item-info">
                        <h3>${item.getTitle()}</h3>
                        <p>${item.getDescription()}</p>
                    </div>
                    <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                        <h5 class="m-0">Due date:</h5>
                        <p class="m-0">${format(date, "dd/MM/yyy")}</p>
                    </div>
                    <div class="priority ${prioStyle(item.getPriority())}">
                    <p class="m-0">${item.getPriority()}</p>
                </div>
                    <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                        <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                        <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
                    </div>
                </div>
            </div>`;
        } else if (result === 1) {
            htmlTagTomorrow += `<div class="card projectItem" id="item${i}">
            <div class="card-body d-flex flex-row justify-content-between align-items-center pt-4">
                <div class="item-info">
                    <h3>${item.getTitle()}</h3>
                    <p>${item.getDescription()}</p>
                </div>
                <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                    <h5 class="m-0">Due date:</h5>
                    <p class="m-0">${format(date, "dd/MM/yyy")}</p>
                </div>
                <div class="priority ${prioStyle(item.getPriority())}">
                    <p class="m-0">${item.getPriority()}</p>
                </div>
                <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                    <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                    <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
                </div>
            </div>
        </div>`;
        } else {
            htmlTagLater += `<div class="card projectItem" id="item${i}">
            <div class="card-body d-flex flex-row justify-content-between align-items-center pt-4">
                <div class="item-info">
                    <h3>${item.getTitle()}</h3>
                    <p>${item.getDescription()}</p>
                </div>
                <div class="due-box  d-flex flex-row justify-content-around align-items-center">
                    <h5 class="m-0">Due date:</h5>
                    <p class="m-0">${format(date, "dd/MM/yyy")}</p>
                </div>
                <div class="item-status">
                    <p class="m-0">${(result < 0 ? " Overdue" : " Upcoming")}</p>
                </div>
                <div class="priority ${prioStyle(item.getPriority())}">
                    <p class="m-0">${item.getPriority()}</p>
                </div>
                <div class="action-icons d-flex flex-row justify-content-around align-items-center">
                    <span id="edit${i}" class="glyphicon glyphicon-pencil"></span>
                    <span id="remove${i}" class="glyphicon glyphicon-remove"></span>
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

function addListenersToProjects() {
    //add listener to projects
    const project_items = document.getElementsByClassName('projectItem');
    const showListProjects = function showListProjects() {
        console.log(this.getAttribute('data-index'));
        renderItems(this.getAttribute('data-index'));
        book.setDomSelectedProject(this.getAttribute('data-index'));
        DisplayController.selectDomProject(this.getAttribute('data-index'));
    };
    for (let i = 0; i < project_items.length; i += 1) {
        project_items[i].addEventListener('click', showListProjects, false);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    book.setDomSelectedProject(0); //sets project default as selected;
    renderProjects();
    renderItems(book.getDomSelectedProject());
    DisplayController.selectDomProject(book.getDomSelectedProject())
    addListenersToProjects();

    //add listener to buttons
    document.getElementById('btnAddProject').addEventListener('click', () => {
        let p = DisplayController.prepareProjectObject();
        if (p.getName() === '' || book.projectExists(p)) {
            console.log('project name empty');
            return;
        } else {
            p = book.addProject(p.getName());
            book.setDomSelectedProject(p.getProjectId());
            renderProjects();
            renderItems(p.getProjectId());
            addListenersToProjects();
            DisplayController.selectDomProject(p.getProjectId());
        };
    });

    document.getElementById('btnAddItem').addEventListener('click', () => {
        let domItem = DisplayController.prepareItemObject();

        if (book.getDomSelectedProject() === -1) {
            console.log('no project selected');
            return;
        } else {
            let currentProject = book.getSingleProject(book.getDomSelectedProject());
            console.log(domItem.getPriority())
            if (domItem.getTitle() === '' || currentProject.itemExists(domItem) || domItem.getPriority() === '0' || domItem.isOverdue()) {
                console.log('item title empty');
                return;
            } else {
                currentProject.addItem(domItem);
                renderItems(book.getDomSelectedProject());
                addListenersToProjects();
            }
        };

    });
});