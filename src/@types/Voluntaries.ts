import { Address } from './Address';
import { Service } from './Services';

export type APIVoluntary = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  services: Service[];
  address: Address;
};

export type Voluntary = APIVoluntary;
