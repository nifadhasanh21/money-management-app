export const STORAGE_KEY = 'money_manager_tx';

export const getTransactions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const saveTransactions = (txs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
};