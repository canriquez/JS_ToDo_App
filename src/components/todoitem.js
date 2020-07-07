export const todoItem = (title, description, dueDate, priority) => {
    const id = 0;
    let itemStatus = 'open';
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getStatus = () => itemStatus;
    const changePriority = (prio) => { priority = prio; };
    const completeItem = () => { itemStatus = 'complete'; };
    const openItem = () => { itemStatus = 'open'; };

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getStatus,
        changePriority,
        completeItem,
        openItem,
    };
};

export default todoItem;