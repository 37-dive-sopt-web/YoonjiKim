import { members } from "./data/members.js";

const LOCAL_STORAGE_KEY = "membersData";

const initLocalStorage = () => {
  const initData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!initData) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(members));
  }
};

const getLocalStorage = () => {
  try {
    const getValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return getValue ? JSON.parse(getValue) : [];
  } catch {
    return [];
  }
};

const deleteLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

const setLocalStorage = (value) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
};

export { initLocalStorage, getLocalStorage, deleteLocalStorage, setLocalStorage };
