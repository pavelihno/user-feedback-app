import axios from 'axios';


export const api = axios.create({
  baseURL: `http://${process.env.DOMAIN_NAME}:${process.env.EXPRESS_DOCKER_PORT}`,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};