import axios from "axios";

const API = "/api";

export const getUsers = async () => {
  const res = await axios.get(`${API}/users`);
  const users = res.data?.data || res.data;
  return Array.isArray(users) ? users : [];
};

export const createUser = async (data: Record<string, any>) => {
  const res = await axios.post(`${API}/users`, data);
  return res.data;
};

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: Record<string, any>;
}) => {
  const res = await axios.put(`${API}/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API}/users/${id}`);
  return res.data;
};
