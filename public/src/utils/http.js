import axios from "axios";
export const baseUrl = "http://localhost:5000"
axios.defaults.baseURL = baseUrl;

export const createUser = async (values) => {
  return await axios.post("/api/auth/register", values);
};

export const login = async (values) => {
  return await axios.post("/api/auth/login", values);
};

export const SetAvatarRoute = async (id, values) => {
  return await axios.post(`/api/auth/set-avatar/${id}`, values);
};

export const getAllContacts = async (id) => {
  return await axios.get(`/api/auth/get-all-contacts/${id}`);
};

export const sendMessageRoute = async (value) => {
  return await axios.post('/api/message/add-msg', value);
};

export const getMessageRoute = async (value) => {
  return await axios.post('/api/message/get-msg', value);
};