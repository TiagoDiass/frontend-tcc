export const convertNumberIntoMoneyString = (moneyNumber: number): string => {
  return 'R$ ' + moneyNumber.toFixed(2).toLocaleString().replace('.', ',');
};
