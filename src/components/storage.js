export const Storage = (() => {

    const storeObject = (obj) => {
        localStorage.setItem("book", JSON.stringify(obj));
    }
    const getObjectStorage = () => {
        console.log("[]: " + localStorage["book"]);
        if (localStorage.getItem("book")) {
            console.log("reading the localStorate I got:" + localStorage.getItem("book"))
            return JSON.parse(localStorage.getItem("book"));
        } else {
            return false;
        }
    }
    const clearStorage = () => {
        localStorage.removeItem("book");
    }

    const saveBook = (book) => {
        //console.log(book.getProjects());
        let projects_in_book = book.getProjects();
        //translate item into jason
        let book_project = {};
        let array_of_items_in_project = [];
        let item;

        for (let i = 0; i < projects_in_book.length; i += 1) {
            array_of_items_in_project = projects_in_book[i].getProjectItems();
            let project_object = {};
            project_object["name"] = projects_in_book[i].getName();
            project_object["projectId"] = projects_in_book[i].getProjectId();
            for (let j = 0; j < array_of_items_in_project.length; j += 1) {
                let json_item = {};
                item = array_of_items_in_project[j];
                json_item["title"] = item.getTitle();
                json_item["description"] = item.getDescription();
                json_item["dueDate"] = item.getDueDate();
                json_item["priority"] = item.getPriority();
                json_item["status"] = item.getStatus();
                json_item["projectId"] = item.getProjectId();
                project_object[j] = json_item;
            }
            book_project[i] = project_object;
        }
        storeObject(book_project);
        console.log('generating initialized book: ' + JSON.stringify(book_project));
    }

    return {
        getObjectStorage,
        storeObject,
        clearStorage,
        saveBook,
    }
})();
export default Storage;