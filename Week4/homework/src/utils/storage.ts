const STORAGE_KEY = 'userId';

const setUserId = (userId: number): void => {
  localStorage.setItem(STORAGE_KEY, String(userId));
};

const getUserId = (): number | null => {
  const userId = localStorage.getItem(STORAGE_KEY);
  return userId ? Number(userId) : null;
};

const removeUserId = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export { setUserId, getUserId, removeUserId };