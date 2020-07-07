const todoProject = (name) => {
    let projectStatus = 'open';
    let projectItems = [];
    let projectName = name;

    const getName = () => projectName;
    const getProjectItems = () => projectItems;
    const closeProject = () => {
        if (projectItems.length === 0) {
            projectStatus = 'close';
            return true;
        } else {
            return false;
        }
    };
    const changeName = (name) => { projectName = name };
    const addItem = (item) => { projectItems.push(item) };
    const removeItem = (itemId) => {
        if (itemId <= projectItems.length - 1) {
            projectItems.splice(itemId, 1);
            return true;
        } else {
            return false;
        };
    };


    return {
        getName,
        getProjectItems,
        closeProject,
        changeName,
        addItem,
        removeItem,

    };
};