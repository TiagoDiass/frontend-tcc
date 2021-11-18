export type APIAddress = {
  cep: string;
  logradouro: string;
  bairro: string;
  complemento: string;
  localidade: string;
  uf: string;
};

export type Address = {
  cep: string;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
};
