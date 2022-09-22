import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000'

export const createUser = (values) => {
  return axios.post('/api/auth/register', values)
}