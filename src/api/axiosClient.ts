import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://swapi.py4e.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail || error.message || 'Failed to fetch data from Star Wars API';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
