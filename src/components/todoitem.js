import { differenceInCalendarDays } from 'date-fns';

export const todoItem = (title, description, dueDate, priority) => {
    let itemStatus = 'open';
    let idProject = 0;
    let editing = false;

    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getStatus = () => itemStatus;
    const setEditing = () => { editing = true; };
    const getEditing = () => editing;
    const clearEditing = () => { editing = false; };

    const setTitle = (newTitle) => { title = newTitle; };
    const setDescription = (newDescription) => { description = newDescription; };
    const setDueDate = (newDueDate) => { dueDate = newDueDate; };
    const setPriority = (newPriority) => { priority = newPriority; };

    const setProject = (projectid) => {
        idProject = projectid;
    };
    const getProjectId = () => idProject;

    const changePriority = (prio) => { priority = prio; };
    const completeItem = () => { itemStatus = 'complete'; };
    const openItem = () => { itemStatus = 'open'; };
    const isOverdue = () => differenceInCalendarDays(Date.parse(getDueDate()), new Date()) < 0;
    return {
        getTitle,
        setTitle,
        getDescription,
        setDescription,
        getDueDate,
        setDueDate,
        getPriority,
        setPriority,
        getStatus,
        getProjectId,
        setProject,
        changePriority,
        completeItem,
        openItem,
        isOverdue,
        setEditing,
        getEditing,
        clearEditing,
    };
};

export default todoItem;