export const Storage = (() => {

    const storeObject = (obj) => {
        localStorage.setItem("book", JSON.stringify({ book: obj }));
    }
    const getObjectStorage = () => {
        console.log("[]: " + localStorage["book"]);
        if (localStorage.getItem("book")) {
            return JSON.parse(localStorage.getItem("book"));
        } else {
            return false;
        }
    }
    const clearStorage = () => {
        localStorage.removeItem("book");
    }

    return {
        getObjectStorage,
        storeObject,
        clearStorage,
    }
})();
export default Storage;