import api from "./axios";

export const registerUser = async (data) => {
  return await api.post("/users", data);
};

export const getUsers = async () => {
  return await api.get("/users");
};
