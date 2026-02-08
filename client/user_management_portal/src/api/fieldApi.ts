import axios from "axios";
import type { Field } from "../types";

const API = "http://localhost:3000/api";

export const getFields = async (): Promise<Field[]> => {
  const res = await axios.get(`${API}/fields`);
  return res.data;
};

export const createField = async (data: Partial<Field>) => {
  const res = await axios.post(`${API}/fields`, data);
  return res.data;
};

export const deleteField = async (id: string) => {
  await axios.delete(`${API}/fields/${id}`);
};
