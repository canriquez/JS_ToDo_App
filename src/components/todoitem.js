import { differenceInCalendarDays, format } from 'date-fns';

export const todoItem = (title, description, dueDate, priority) => {
    let itemStatus = 'open';
    let idProject = 0;

    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getHtmlSafeDueDate = () => format(dueDate, "dd-MM-yyyy");
    const getPriority = () => priority;
    const getStatus = () => itemStatus;

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
        getHtmlSafeDueDate,
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
    };
};

export default todoItem;