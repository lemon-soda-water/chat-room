import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000'

export const createUser = async (values) => {
  return await axios.post('/api/auth/register', values)
}

export const login = async (values) => {
  return await axios.post('/api/auth/login', values)
}

export const SetAvatarRoute = async (id, values) => {
  return await axios.post(`/api/auth/set-avatar/${id}`, values)
}