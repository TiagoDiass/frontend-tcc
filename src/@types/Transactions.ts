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
  value: number;
  type: 'Entrada 🟢' | 'Saída 🔴';
  date: string;
};
