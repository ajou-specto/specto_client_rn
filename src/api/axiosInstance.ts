import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.API_URL,
  // baseURL: 'http://172.30.1.72:8080',
});

export default axiosInstance;
