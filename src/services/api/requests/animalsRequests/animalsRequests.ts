import { APIAnimal } from '@/@types/Animals';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const getAll = (): Promise<AxiosResponse<APIResponseModel<APIAnimal[]>>> => {
  return api.get('/animals');
};

const getById = async (
  animalId: string
): Promise<AxiosResponse<APIResponseModel<APIAnimal | null>>> => {
  return api.get(`/animals/${animalId}`);
};

const add = (
  animal: Omit<APIAnimal, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIAnimal | null>>> => {
  return api.post('/animals/create', animal);
};

const remove = (
  animalId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`/animals/delete/${animalId}`);
};

const update = (
  animal: APIAnimal
): Promise<AxiosResponse<APIResponseModel<APIAnimal | null>>> => {
  return api.put(`/animals/update/${animal.id}`, animal);
};

export default {
  getAll,
  getById,
  add,
  remove,
  update,
};
