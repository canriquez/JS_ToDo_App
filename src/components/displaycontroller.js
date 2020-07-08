const { default: todoProject } = require("./todoproject");
const { default: todoItem } = require("./todoitem");

export const DisplayController = (() => {

    const prepareProjectObject = () => {
        let name = document.getElementById('projectName').value;
        let project = todoProject(name, 0);
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

    return {
        prepareProjectObject,
        prepareItemObject
    }

})();

export default DisplayController;