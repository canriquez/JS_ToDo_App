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
        let date = Date.parse(document.getElementById('inputDate').value);
        console.log(format(date, 'dd/MM/yyy'));
        let title = document.getElementById('inputTitle').value;
        let description = document.getElementById('inputDescription').value;
        let duedate = format(date, 'dd/MM/yyy');
        let priority = document.getElementById('inputPriority').value;
        let item = todoItem(title, description, duedate, priority);
        console.log(item);
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

    return {
        prepareProjectObject,
        prepareItemObject,
        selectDomProject,
    }

})();

export default DisplayController;