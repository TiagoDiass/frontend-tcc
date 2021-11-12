import { Animal, APIAnimal } from '@/@types/Animals';
import { APIService, Service } from '@/@types/Services';
import { APIProduct, Product } from '@/@types/Products';
import { APITransaction, Transaction } from '@/@types/Transactions';

/**
 * It converts an APIAnimal to an Animal
 */
export const convertAPIAnimalToAnimal = (apiAnimal: APIAnimal): Animal => {
  const types = {
    dog: '🐶 Cão',
    cat: '🐱 Gato',
  } as const;

  const genders = {
    M: 'Macho',
    F: 'Femêa',
  } as const;

  const sizes = {
    G: 'Grande',
    M: 'Médio',
    P: 'Pequeno',
  } as const;

  return {
    id: apiAnimal.id,
    name: apiAnimal.name,
    pictureUrl: apiAnimal.pictureUrl,
    type: types[apiAnimal.type],
    gender: genders[apiAnimal.gender],
    size: sizes[apiAnimal.size],
  };
};

/**
 * It converts an array of APIAnimals to an array of Animals
 */
export const convertAPIAnimalsToAnimals = (
  apiAnimals: APIAnimal[]
): Animal[] => {
  return apiAnimals.map(convertAPIAnimalToAnimal);
};

/**
 * It converts an APIService to a Service
 */
export const convertAPIServiceToService = (apiService: APIService): Service =>
  apiService;

/**
 * It converts an array of APIServices to an array of Services
 */
export const convertAPIServicesToServices = (
  apiServices: APIService[]
): Service[] => {
  return apiServices.map(convertAPIServiceToService);
};

/**
 * It converts an APIProduct to a Product
 */
export const convertAPIProductToProduct = (apiProduct: APIProduct): Product =>
  apiProduct;

/**
 * It converts an array of APIProducts to an array of Products
 */
export const convertAPIProductsToProducts = (
  apiProducts: APIProduct[]
): Product[] => {
  return apiProducts.map(convertAPIProductToProduct);
};

/**
 * It converts an APITransaction to a Transaction
 */
export const convertAPITransactionToTransaction = (
  apiTransaction: APITransaction
): Transaction => {
  const types = {
    deposit: 'Entrada 🟢',
    withdraw: 'Saída 🔴',
  } as const;

  return {
    ...apiTransaction,
    type: types[apiTransaction.type],
  };
};

/**
 * It converts an array of APITransactions to an array of Transactions
 */
export const convertAPITransactionsToTransactions = (
  apiTransactions: APITransaction[]
): Transaction[] => {
  return apiTransactions.map(convertAPITransactionToTransaction);
};
