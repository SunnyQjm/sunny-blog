export const LocalStorageKeys = {
  USER: 'user'
};

export const LocalStorageManager = {
  save<T>(key: string, value: T) {
    let insertValue = JSON.stringify(value);
    localStorage.setItem(key, insertValue);
  },

  getString(key: string) {
    return localStorage.getItem(key);
  },

  getObj(key: string) {
    const result = localStorage.getItem(key);
    if(result) {
      return JSON.parse(result);
    }
    return null;
  }
};
