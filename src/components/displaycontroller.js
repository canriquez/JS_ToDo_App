const { default: todoProject } = require("./todoproject");
const { default: todoItem } = require("./todoitem");

export const DisplayController = (() => {

    const prepareProjectObject = () => {
        let name = document.getElementById('projectName').value;
        let project = todoProject(name, 0);
        document.getElementById('projectName').value = '';
        return project;
    };

    const prepareItemObject = () => {
        let title = document.getElementById('projectName').value;
        let description = document.getElementById('projectName').value;
        let duedate = document.getElementById('projectName').value;
        let priority = document.getElementById('projectName').value;
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

    return {
        prepareProjectObject,
        prepareItemObject,
        selectDomProject,
    }

})();

export default DisplayController;