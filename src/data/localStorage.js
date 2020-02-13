export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.log("Error loading state", error);
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (error) {
        console.log("Error saving state", error);
    }
}