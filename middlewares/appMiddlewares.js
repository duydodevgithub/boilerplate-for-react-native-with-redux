export const logger = (store) => (next) => (action) => {
    console.group();
    console.log("Current state: ", store.getState());
    console.log("Current action is: ", action);
    const result = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return result;
}