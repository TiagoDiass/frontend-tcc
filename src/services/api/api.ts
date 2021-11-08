import axios from 'axios';

export type APIResponseModel<ResponseDataType> = {
  message: string;
  data: ResponseDataType;
  errors?: string[];
};

const api = axios.create({
  baseURL: 'http://localhost:3333',
  validateStatus: (status) => status < 500,
});

export default api;
