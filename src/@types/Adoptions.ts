import { Address } from './Address';
import { Animal, APIAnimal } from './Animals';

export type APIAdoption = {
  id: string;
  adopter: {
    name: string;
    phone: string;
    address: Address;
  };
  animal: APIAnimal;
};

export type Adoption = {
  id: string;
  adopter: {
    name: string;
    phone: string;
    address: Address;
  };
  animal: Animal;
};
