import api from "./axios";

export const registerUser = (data) => {
  return api.post("/users", data);
};

export const getUsers = () => {
  return api.get("/users");
};
