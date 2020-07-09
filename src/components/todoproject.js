export const todoProject = (name, projectid) => {
    let projectStatus = 'open';
    const projectId = projectid;
    const projectName = name;
    const projectItems = [];
    let editing = false;

    const setEditing = () => { editing = true; };
    const getEditing = () => editing;
    const clearEditing = () => { editing = false; };
    const getName = () => projectName;
    const getProjectId = () => projectId;
    const getProjectItems = () => projectItems;
    const getProjectStatus = () => projectStatus;
    const closeProject = () => {
        if (projectItems.length === 0) {
            projectStatus = 'close';
            return true;
        }
        return false;
    };

    const changeName = (newName) => { name = newName; };

    const addItem = (item) => {
        item.setProject(projectId);
        projectItems.push(item);
    };
    const itemExists = (item) => {
        return projectItems.some(function(current) {
            return current.getTitle().toLowerCase() === item.getTitle().toLowerCase()
        });
    }

    const removeItem = (itemId) => {
        if (itemId <= projectItems.length - 1) {
            projectItems.splice(itemId, 1);
            return true;
        }
        return false;
    };
    return {
        getName,
        getProjectId,
        getProjectItems,
        getProjectStatus,
        closeProject,
        changeName,
        addItem,
        itemExists,
        removeItem,
        setEditing,
        getEditing,
        clearEditing,
    };
};

export default todoProject;