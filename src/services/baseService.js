import axios from 'axios';
import { getCookie } from '../utils/cookie';

function getTokenAuth() {
  if (getCookie('token') && getCookie('userData')) {
    return JSON.parse(getCookie('token'));
  }
  return '';
}

const createAxiosInterceptor = (url) => {
  const myToken = getTokenAuth();
  if (myToken) {
    console.log('Hello my token', myToken);
  }
  const axiosCreate = axios.create({
    baseURL: url,
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'es',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getTokenAuth()}`,
    },
  });
  axiosCreate.interceptors.response.use(
    (response) => {
      console.log(response, 'line 23');
      return response.data;
    },
    (error) => {
      console.log(error);
      console.log('namaku');
      if (error.response.status === 401) {
        window.location.replace('/');
      }
      return Promise.reject(error);
    }
  );

  return axiosCreate;
};

const BaseService = createAxiosInterceptor(process.env.REACT_APP_API);

export default BaseService;
