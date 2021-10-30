import { APIAnimal } from '@/@types/Animals';
import api, { APIResponseModel } from '@/services/api/api';
import { AxiosResponse } from 'axios';

const getAll = (): Promise<AxiosResponse<APIResponseModel<APIAnimal[]>>> => {
  return api.get('/animals');
};

export default {
  getAll,
};
