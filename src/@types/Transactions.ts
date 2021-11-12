export type APITransaction = {
  id: string;
  title: string;
  value: number;
  type: 'deposit' | 'withdraw';
  date: string;
};

export type Transaction = {
  id: string;
  title: string;
  value: string;
  type: '🟢 Entrada' | '🔴 Saída';
  date: string;
};

export type Balance = {
  total: number;
  entries: number;
  withdraws: number;
};
