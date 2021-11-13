export type APIMedicine = {
  id: string;
  name: string;
  description: string;
  expirationDate: string;
  amount: {
    unit: 'mls' | 'mgs' | 'pill amount';
    value: number;
  };
};

export type Medicine = {
  id: string;
  name: string;
  description: string;
  expirationDate: string;
  amount: { unit: 'mililitro' | 'miligrama' | 'comprimido'; value: number };
};
