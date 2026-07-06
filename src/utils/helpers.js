export const getBalance = (txs) => {
  return txs.reduce((acc, tx) => acc + (tx.type === 'income' ? tx.amount : -tx.amount), 0);
};

export const getTotalIncome = (txs) => {
  return txs.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
};

export const getTotalExpense = (txs) => {
  return txs.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
};