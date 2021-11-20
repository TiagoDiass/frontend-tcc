import { Address } from './Address';
import { Animal } from './Animals';

export type APIAdoption = {
  id: string;
  adopter: {
    name: string;
    phone: string;
    address: Address;
  };
  animalId: Animal['id'];
};

export type Adoption = APIAdoption;
