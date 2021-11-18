import { Address, APIAddress } from '@/@types/Address';

const viaCepURL = 'https://viacep.com.br/ws';

/**
 * Request to fetch the address data based on CEP
 */
const fetchAddressByCEP = async (
  cep: string
): Promise<Omit<Address, 'number'> | null> => {
  const response = await fetch(`${viaCepURL}/${cep}/json/`);

  const data = await response.json();

  if (data.erro) {
    return null;
  }

  const {
    cep: fetchedCep,
    logradouro,
    bairro,
    complemento,
    localidade,
    uf,
  }: APIAddress = data;

  return {
    cep: fetchedCep,
    city: localidade,
    district: bairro,
    street: logradouro,
    state: uf,
    complement: complemento,
  };
};

export default { fetchAddress: fetchAddressByCEP };
