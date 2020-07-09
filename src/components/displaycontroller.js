const { default: todoProject } = require("./todoproject");
const { default: todoItem } = require("./todoitem");
import { format } from 'date-fns';

export const DisplayController = (() => {

    const prepareProjectObject = () => {
        let name = document.getElementById('projectName').value;
        let project = todoProject(name, 0);
        document.getElementById('projectName').value = '';
        return project;
    };

    const prepareItemObject = () => {
        let parts = document.getElementById('inputDate').value.split("-");
        let date = new Date(parts[0] + '/' + parts[1] + '/' + parts[2]);
        let title = document.getElementById('inputTitle').value;
        let description = document.getElementById('inputDescription').value;
        let duedate = date;
        let priority = document.getElementById('inputPriority').value;
        let item = todoItem(title, description, duedate, priority);
        return item;
    };

    const selectDomProject = (project) => {
        const project_items = document.getElementsByClassName('projectItem');
        for (let i = 0; i < project_items.length; i += 1) {
            project_items[i].classList.remove('selectedProject');;
        }
        const domProject = document.getElementById('p' + project);
        domProject.classList.add('selectedProject');
    }

    const clearItemProjectForm = () => {
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputDescription').value = '';
        document.getElementById('inputPriority').value = 'low';
        document.getElementById('inputDate').value = '';
    }

    return {
        prepareProjectObject,
        prepareItemObject,
        selectDomProject,
        clearItemProjectForm
    }

})();

export default DisplayController;