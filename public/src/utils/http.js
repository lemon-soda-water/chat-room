import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000'

export const createUser = async (values) => {
  return await axios.post('/api/auth/register', values)
}