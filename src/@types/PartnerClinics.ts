import { Address } from './Address';

export type APIPartnerClinic = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: Address;
};

export type PartnerClinic = APIPartnerClinic;
