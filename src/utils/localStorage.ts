export const saveToStorage = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (key: string, defaultValue: unknown) => {
    try {
        const data = localStorage.getItem(key);
        if (!data) {
            saveToStorage(key, defaultValue);
            return defaultValue;
        }

        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
};