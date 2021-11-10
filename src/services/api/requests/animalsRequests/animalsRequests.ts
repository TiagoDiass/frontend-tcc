import { APIAnimal } from '@/@types/Animals';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

/**
 * Request to get all the animals
 */
const getAll = (): Promise<AxiosResponse<APIResponseModel<APIAnimal[]>>> => {
  return api.get('/animals');
};

/**
 * Request to get an animal by its id
 */
const getById = async (
  animalId: string
): Promise<AxiosResponse<APIResponseModel<APIAnimal | null>>> => {
  return api.get(`/animals/${animalId}`);
};

/**
 * Request to create an animal
 */
const add = (
  animal: Omit<APIAnimal, 'id'>
): Promise<AxiosResponse<APIResponseModel<APIAnimal | null>>> => {
  return api.post('/animals/create', animal);
};

/**
 * Request to remove an animal
 */
const remove = (
  animalId: string
): Promise<AxiosResponse<APIResponseModel<string | null>>> => {
  return api.delete(`/animals/delete/${animalId}`);
};

/**
 * Request to update an animal
 */
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
